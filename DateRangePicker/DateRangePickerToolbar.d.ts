import * as React from 'react';
import { MuiStyles } from '@material-ui/core/styles';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
export declare const styles: MuiStyles<'root' | 'penIcon' | 'dateTextContainer'>;
interface DateRangePickerToolbarProps extends CurrentlySelectingRangeEndProps, Pick<ToolbarComponentProps, 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView' | 'toolbarTitle' | 'toolbarFormat'> {
    date: DateRange<unknown>;
    startText: React.ReactNode;
    endText: React.ReactNode;
    currentlySelectingRangeEnd: 'start' | 'end';
    setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
declare const _default: React.JSXElementConstructor<Omit<DateRangePickerToolbarProps & {
    classes: import("@material-ui/styles").ClassNameMap<"root" | "penIcon" | "dateTextContainer">;
} & {
    children?: React.ReactNode;
}, "classes"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "penIcon" | "dateTextContainer"> & object>;
export default _default;
