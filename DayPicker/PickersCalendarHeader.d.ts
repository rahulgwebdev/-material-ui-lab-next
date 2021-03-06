import * as React from 'react';
import { MuiStyles } from '@material-ui/core/styles';
import { SlideDirection } from './PickersSlideTransition';
import { DateValidationProps } from '../internal/pickers/date-utils';
import { ExportedArrowSwitcherProps } from '../internal/pickers/PickersArrowSwitcher';
import { DatePickerView } from '../internal/pickers/typings/Views';
export declare type ExportedCalendarHeaderProps<TDate> = Pick<PickersCalendarHeaderProps<TDate>, 'components' | 'componentsProps' | 'leftArrowButtonText' | 'rightArrowButtonText' | 'getViewSwitchingButtonText'>;
export interface PickersCalendarHeaderProps<TDate> extends ExportedArrowSwitcherProps, Omit<DateValidationProps<TDate>, 'shouldDisableDate'> {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: ExportedArrowSwitcherProps['components'] & {
        SwitchViewButton?: React.ElementType;
        SwitchViewIcon?: React.ElementType;
    };
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps?: ExportedArrowSwitcherProps['componentsProps'] & {
        switchViewButton?: any;
    };
    openView: DatePickerView;
    views: DatePickerView[];
    currentMonth: TDate;
    /**
     * Get aria-label text for switching between views button.
     */
    getViewSwitchingButtonText?: (currentView: DatePickerView) => string;
    reduceAnimations: boolean;
    onViewChange?: (view: DatePickerView) => void;
    onMonthChange: (date: TDate, slideDirection: SlideDirection) => void;
}
export declare type PickersCalendarHeaderClassKey = 'root' | 'yearSelectionSwitcher' | 'switchView' | 'switchViewActive' | 'label' | 'labelItem';
export declare const styles: MuiStyles<PickersCalendarHeaderClassKey>;
declare const _default: <TDate>(props: PickersCalendarHeaderProps<TDate>) => JSX.Element;
export default _default;
