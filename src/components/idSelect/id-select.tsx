/**
 * @author meng
 * @version 1.0
 * @date 2022/12/29
 * @file 实现id类型
 */
import { Select } from 'antd';
import { ComponentProps } from 'react';

import { Raw } from '@/types/index';

type SelectProps = ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value?: Raw | null | undefined;
    onChange?: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}
const toNumber = (value: unknown) => (Number.isNaN(Number(value)) ? 0 : Number(value));
/**
 * value 可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为true时，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props;
    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChange={value => onChange?.(toNumber(value) || undefined)}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map(option => (
                <Select.Option
                    key={option.id}
                    value={option.id}
                >
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    );
};
