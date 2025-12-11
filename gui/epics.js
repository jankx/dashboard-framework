import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import {
    fetchOptionsRequest,
    fetchOptionsSuccess,
    fetchOptionsFailure,
    saveOptionsRequest,
    saveOptionsSuccess,
    saveOptionsFailure,
} from './actions';

const fetchOptionsEpic = (action$) =>
    action$.pipe(
        ofType('FETCH_OPTIONS_REQUEST'),
        mergeMap(() => {
            const ajaxUrl = (window.jankxOptionAjax && window.jankxOptionAjax.ajaxurl) 
                ? window.jankxOptionAjax.ajaxurl 
                : '/wp-admin/admin-ajax.php';
            return ajax.getJSON(`${ajaxUrl}?action=fetch_options`).pipe(
                map(response => fetchOptionsSuccess(response.data || response)),
                catchError(error => of(fetchOptionsFailure(error.message || error)))
            );
        })
    );

const saveOptionsEpic = (action$) =>
    action$.pipe(
        ofType('SAVE_OPTIONS_REQUEST'),
        mergeMap(action => {
            const ajaxUrl = (window.jankxOptionAjax && window.jankxOptionAjax.ajaxurl) 
                ? window.jankxOptionAjax.ajaxurl 
                : '/wp-admin/admin-ajax.php';
            const nonce = (window.jankxOptionAjax && window.jankxOptionAjax.nonce) 
                ? window.jankxOptionAjax.nonce 
                : '';
            
            // Ensure payload exists
            const payload = action.payload || {};
            
            // Build form data for WordPress AJAX
            const formData = new URLSearchParams();
            formData.append('action', 'save_options');
            formData.append('nonce', nonce);
            formData.append('data', JSON.stringify(payload));
            
            return ajax.post(ajaxUrl, formData.toString(), {
                'Content-Type': 'application/x-www-form-urlencoded',
            }).pipe(
                map(() => saveOptionsSuccess()),
                catchError(error => of(saveOptionsFailure(error.message || error)))
            );
        })
    );

const rootEpic = (action$) => {
    return merge(
        fetchOptionsEpic(action$),
        saveOptionsEpic(action$)
    );
};

export default rootEpic;