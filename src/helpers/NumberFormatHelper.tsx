import NumberFormat from 'react-number-format';

export interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  tenormax: number;
  prefix?: string;
  suffix?:string;
  thousandSeparator: string;
  decimalScale?: number;
  decimalSeparator?: string;
}

export const NumberFormatHelper = (props: NumberFormatCustomProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= props.tenormax;
      }}
      isNumericString
      allowLeadingZeros={false}
      defaultValue={0}
      allowNegative={false}
      prefix={props.prefix}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={props.thousandSeparator}
      decimalSeparator={props.decimalSeparator}
      decimalScale={props.decimalScale}
    />
  );
}

export default NumberFormatHelper;