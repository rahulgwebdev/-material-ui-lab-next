import { SlideDirection } from './PickersSlideTransition';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
interface CalendarState<TDate> {
    isMonthSwitchingAnimating: boolean;
    currentMonth: TDate;
    focusedDay: TDate | null;
    slideDirection: SlideDirection;
}
declare type ReducerAction<TType, TAdditional = {}> = {
    type: TType;
} & TAdditional;
interface ChangeMonthPayload<TDate> {
    direction: SlideDirection;
    newMonth: TDate;
}
export declare const createCalendarStateReducer: <TDate extends unknown>(reduceAnimations: boolean, disableSwitchToMonthOnDayFocus: boolean, utils: MuiPickersAdapter<TDate>) => (state: CalendarState<TDate>, action: {
    type: "finishMonthSwitchingAnimation";
} | ReducerAction<"changeMonth", ChangeMonthPayload<TDate>> | ReducerAction<"changeFocusedDay", {
    focusedDay: TDate;
}>) => CalendarState<TDate>;
declare type CalendarStateInput<TDate> = Pick<import('./DayPicker').DayPickerProps<TDate>, 'disableFuture' | 'disablePast' | 'shouldDisableDate' | 'date' | 'reduceAnimations' | 'onMonthChange' | 'defaultCalendarMonth' | 'minDate' | 'maxDate'> & {
    disableSwitchToMonthOnDayFocus?: boolean;
};
export declare function useCalendarState<TDate>({ date, defaultCalendarMonth, disableFuture, disablePast, disableSwitchToMonthOnDayFocus, maxDate, minDate, onMonthChange, reduceAnimations, shouldDisableDate, }: CalendarStateInput<TDate>): {
    calendarState: CalendarState<TDate>;
    changeMonth: (newDate: TDate) => void;
    changeFocusedDay: (newFocusedDate: TDate) => void;
    isDateDisabled: (day: TDate | null) => boolean;
    onMonthSwitchingAnimationEnd: () => void;
    handleChangeMonth: (payload: ChangeMonthPayload<TDate>) => void;
};
export {};
