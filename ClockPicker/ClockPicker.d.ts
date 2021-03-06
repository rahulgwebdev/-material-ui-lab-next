import * as React from 'react';
import { MuiStyles } from '@material-ui/core/styles';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { TimeValidationProps } from '../internal/pickers/time-utils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
export interface ExportedClockPickerProps<TDate> extends TimeValidationProps<TDate> {
    /**
     * 12h/24h view for hour selection clock.
     * @default false
     */
    ampm?: boolean;
    /**
     * Step over minutes.
     * @default 1
     */
    minutesStep?: number;
    /**
     * Display ampm controls under the clock (instead of in the toolbar).
     * @default false
     */
    ampmInClock?: boolean;
    /**
     * Enables keyboard listener for moving between days in calendar.
     * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
     */
    allowKeyboardControl?: boolean;
    /**
     * Accessible text that helps user to understand which time and view is selected.
     * @default <TDate extends any>(
     *   view: 'hours' | 'minutes' | 'seconds',
     *   time: TDate,
     *   adapter: MuiPickersAdapter<TDate>,
     * ) => `Select ${view}. Selected time is ${adapter.format(time, 'fullTime')}`
     */
    getClockLabelText?: (view: 'hours' | 'minutes' | 'seconds', time: TDate, adapter: MuiPickersAdapter<TDate>) => string;
}
export interface ClockPickerProps<TDate> extends ExportedClockPickerProps<TDate> {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     */
    components?: {
        LeftArrowButton?: React.ElementType;
        LeftArrowIcon?: React.ElementType;
        RightArrowButton?: React.ElementType;
        RightArrowIcon?: React.ElementType;
    };
    /**
     * The props used for each slot inside.
     */
    componentsProps?: {
        leftArrowButton?: any;
        rightArrowButton?: any;
    };
    /**
     * Selected date @DateIOType.
     */
    date: TDate | null;
    /**
     * On change callback @DateIOType.
     */
    onChange: PickerOnChangeFn<TDate>;
    /**
     * Get clock number aria-text for hours.
     * @default (hours: string) => `${hours} hours`
     */
    getHoursClockNumberText?: (hours: string) => string;
    /**
     * Get clock number aria-text for minutes.
     * @default (minutes: string) => `${minutes} minutes`
     */
    getMinutesClockNumberText?: (minutes: string) => string;
    /**
     * Get clock number aria-text for seconds.
     * @default (seconds: string) => `${seconds} seconds`
     */
    getSecondsClockNumberText?: (seconds: string) => string;
    /**
     * Left arrow icon aria-label text.
     * @default 'open previous view'
     */
    leftArrowButtonText?: string;
    openNextView: () => void;
    openPreviousView: () => void;
    /**
     * Right arrow icon aria-label text.
     * @default 'open next view'
     */
    rightArrowButtonText?: string;
    view: 'hours' | 'minutes' | 'seconds';
    nextViewAvailable: boolean;
    previousViewAvailable: boolean;
    showViewSwitcher?: boolean;
}
export declare const styles: MuiStyles<'arrowSwitcher'>;
declare const _default: <TDate>(props: ClockPickerProps<TDate>) => JSX.Element;
/**
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */
export default _default;
