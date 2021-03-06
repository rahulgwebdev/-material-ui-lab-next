import * as React from 'react';
import { DateIOFormats, IUtils } from '@date-io/core/IUtils';
export declare type MuiPickersAdapter<TDate = unknown> = IUtils<TDate>;
export declare const MuiPickersAdapterContext: React.Context<MuiPickersAdapter<unknown> | null>;
export interface LocalizationProviderProps {
    children?: React.ReactNode;
    /** DateIO adapter class function */
    dateAdapter: new (...args: any) => MuiPickersAdapter;
    /** Formats that are used for any child pickers */
    dateFormats?: Partial<DateIOFormats>;
    /**
     * Date library instance you are using, if it has some global overrides
     * ```jsx
     * dateLibInstance={momentTimeZone}
     * ```
     */
    dateLibInstance?: any;
    /** Locale for the date library you are using */
    locale?: string | object;
}
/**
 * @ignore - do not document.
 */
declare const LocalizationProvider: React.FC<LocalizationProviderProps>;
export default LocalizationProvider;
