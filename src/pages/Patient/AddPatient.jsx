import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';

import { Box, Button, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';


import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { PatternFormat } from 'react-number-format'
import { changeloading } from '../../store/actions/loading.action';
import { MaskNome } from '../../utils/mascaras';
import Logo from '../../image/logo_site.png'
import UsersService from '../../services/UsersService';
import { changeNotify } from '../../store/actions/notify.actions';
import { LocationContext } from '../../context/LocationContext';


const schema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  cpf: yup.string().required(),
  date_birth: yup.string().required(),
  phone: yup.string().required(),
  sex: yup.string().required(),
});


function AddPatient({ handleClose, onPatientAdded }) {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const { estado, cidade, setIdEstado } = useContext(LocationContext);
  const [estadoSelecionado, setEstadoSelecionado] = useState('0');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('0');


  const [idade, setIdade] = useState(null);
  const handleDateChange = (e) => {
    const novaIdade = calcularIdade(e.target.value);
    setIdade(novaIdade); // Atualiza a idade no estado
    setValue("date_birth", e.target.value); // Atualiza o valor no formulário
  };
  const calcularIdade = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };



  const handleChangeEstado = (event) => {
    const estadoSelecionado = event.target.value;
    setEstadoSelecionado(estadoSelecionado);

    const estadoEncontrado = estado.find(e => e.sigla === estadoSelecionado);
    if (estadoEncontrado) {
      setIdEstado(estadoEncontrado.id);
    }
  };



  function handleSubmit(data) {
    dispatch(changeloading({ open: true, msg: 'Salvando..' }))
    UsersService.create(data, 'patient').then((res) => {
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'success', msg: res.message }))
      reset()
      handleClose();
      if (onPatientAdded) {
        onPatientAdded();
      }
    })
      .catch((error) => {
        console.log(error)
        dispatch(changeloading({ open: false, }))
        dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.message }))
      })
  }


  return (
    <Box component={Paper} elevation={5} sx={{ flexGrow: 1 }} marginTop={1} padding={2}  >
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6} md={6}>
          <img src={Logo} alt="Logo" style={{ margin: '8px', width: 'auto', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>

          <Grid container spacing={2} >
            <Grid item xs={10} sm={4} md={6}></Grid>
            <Grid item xs={8} sm={8} md={6}>
              {idade !== null && (
                <Typography>Paciente tem: {idade} anos</Typography>
              )}
            </Grid>
          </Grid>


        </Grid>
      </Grid>


      <Box padding={2}  >
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Nome do paciente'
                variant='outlined'
                fullWidth
                size='small'
                {...register("name")}
                onInput={(e) => {
                  e.target.value = MaskNome(e.target.value);
                  setValue("name", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.name?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='email'
                type='email'
                variant='outlined'
                fullWidth
                size='small'
                {...register("email")}
              />
              <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
            </Grid>


            <Grid item xs={12} sm={6} md={6} lg={3}>
              <PatternFormat
                label='CPF'
                format='###.###.###-##'
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return !formattedValue || formattedValue.length <= 14;
                }}
                fullWidth
                size='small'
                customInput={TextField}
                onInput={(e) => setValue("cpf", e.target.value, { shouldValidate: true })}
                {...register("cpf")}
              />
              <Typography variant='subtitle2'>{errors?.cpf?.message}</Typography>
            </Grid>



            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Data Nascimento'
                variant='outlined'
                InputLabelProps={{ shrink: true, }}
                fullWidth
                size='small'
                type='date'
                {...register("date_birth")}
                onChange={handleDateChange}
              />
              <Typography variant='subtitle2'>{errors?.date_birth?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <PatternFormat
                label='Telefone'
                format='(##)#####-####'
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return !formattedValue || formattedValue.length <= 14;
                }}
                fullWidth
                size='small'
                customInput={TextField}
                onInput={(e) => setValue("phone", e.target.value, { shouldValidate: true })}
                {...register("phone")}
              />
              <Typography variant='subtitle2'>{errors?.phone?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={5} xl={3}>
              <Grid container alignItems="center">
                <FormLabel >Sexo:  </FormLabel>
                <RadioGroup row onChange={(e) => setValue("sex", e.target.value)}>
                  <FormControlLabel sx={{ marginLeft: '5px' }} value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                </RadioGroup>
              </Grid>
              <Typography variant='subtitle2'>{errors?.sex?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={5} xl={2}>
              <TextField
                label='Endereço'
                variant='outlined'
                fullWidth
                size='small'
                {...register("address")}
              />

            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                {...register('state')}
                value={estadoSelecionado}
                onChange={handleChangeEstado}
              >
                <MenuItem value='0'>Selecione o Estado</MenuItem>
                {estado.map((estado) => (
                  <MenuItem key={estado.id} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>

            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                {...register('city')}
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                disabled={!estado}
              >
                <MenuItem value='0'>Selecione a Cidade</MenuItem>
                {cidade.map((cidade) => (
                  <MenuItem key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </MenuItem>
                ))}
              </Select>

            </Grid>

            <Grid container spacing={1} margin={3}> {/* Diminua o spacing de 2 para 1 */}

              <Grid item xs={12} sm={5} md={5} lg={2}>
                <Button
                  type='submit'
                  sx={{
                    backgroundColor: '#1A3433 !important',
                    color: '#fff !important',
                    marginRight: '10px',  // Adiciona espaçamento à direita do primeiro botão
                    '&:hover': {
                      backgroundColor: '#fff !important',
                      color: '#1A3433 !important',
                    },
                    '&:active': {
                      backgroundColor: '#fff !important',
                      color: '#1A3433 !important',
                    }
                  }}
                  variant='contained'
                >
                  Salvar
                </Button>

                <Button
                  color='secondary'
                  onClick={() => reset()}
                  variant='contained'
                >
                  Limpar
                </Button>
              </Grid>

            </Grid>



          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default AddPatient;
