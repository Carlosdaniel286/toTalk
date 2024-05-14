import FormLabel from '@mui/joy/FormLabel';
import style from './styles/input.module.css';
import FormControl from "@mui/joy/FormControl";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import { typeValidations } from '@/@types/validations';
import { SxProps } from '@mui/material/styles';




interface propsInputStandard extends typeValidations {
  label?: string,
  placeholder?: string,
  id?: string,
  onChange?: ((ev: string) => void)
  value?: string,
  error?: boolean,
  errorMessage?: string,
  sx?: SxProps
}

export function InputStandard({ label, placeholder, id, onChange, value, inputType, error, errorMessage, sx }: propsInputStandard) {
  const styles: SxProps = {
    color: 'black',
    fontSize: '17px',
    height: '46px',
    fontFamily: 'myFont',
    textDecoration: 'none',
    textTransform: 'capitalize',
    '&:focus-within': {
      '--Input-focusedHighlight': error ? 'red' : 'black',
      color: error ? 'red' : 'black',
    }
  }
  const newStyle = { ...styles, ...sx }

  return (
    <>
      <Stack spacing={0} >
        <FormControl error={error} >
          <FormLabel className={style.label}
            sx={{ fontWeight: '1000', fontSize: '16px', fontFamily: 'myFont', wordBreak: 'break-all' }}
          >{label}</FormLabel>
          <Input
            value={value}
            type={inputType}
            onChange={((ev) => {
              if (!onChange) return
              onChange(ev.target.value)
            })}

            id={id}
            error={error}
            defaultValue={errorMessage}
            placeholder={placeholder}
            sx={newStyle}
          />

          <FormHelperText sx={{
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            margin: '0px',
            height: '20px',
            marginBottom: '1px',
            paddingleft: '20px',
            width: "100%",
            // background:'black'
          }} >
            {error && <InfoOutlined
              style={{
                fontSize: '0.8rem'
              }}
            />}
            <p className={style.error}>{errorMessage}</p>
          </FormHelperText>
        </FormControl>
      </Stack>
    </>
  );
}
