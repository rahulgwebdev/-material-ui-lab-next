/// <reference types="react" />
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
interface GetHourNumbersOptions {
    ampm: boolean;
    date: unknown;
    getClockNumberText: (hour: string) => string;
    isDisabled: (value: number) => boolean;
    onChange: (value: number, isFinish?: PickerSelectionState) => void;
    utils: MuiPickersAdapter;
}
/**
 * @ignore - internal component.
 */
export declare const getHourNumbers: ({ ampm, date, getClockNumberText, isDisabled, utils, }: GetHourNumbersOptions) => JSX.Element[];
export declare const getMinutesNumbers: ({ utils, value, isDisabled, getClockNumberText, }: Omit<GetHourNumbersOptions, "date" | "ampm"> & {
    value: number;
}) => JSX.Element[];
export {};
