import React, { useEffect } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import Logo from '../image/logo_site.png'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';



const schema = yup
  .object({
    name_user: yup.string().required(),
    password: yup.string().required().min(5),
  })

function Login() {
  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = async (credentials) => {
    try {
      await dispatch(login(credentials));
      const user = JSON.parse(localStorage.getItem("user"));
      switch (user.group_id) {
        case 1:
          navigate("/dashboard");
          break;
        case 2:
          navigate("/dashboard/medico");
          break;
        case 3:
          navigate("/dashboard/paciente");
          break;
        default:
          navigate("/");  // Em caso de não reconhecer o group_id, redireciona para a homepage ou outro componente
          break;
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };




  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
      sx={{ background: '#1A3433', }}>
      <Box component={Paper} elevation={4} display='flex' flexDirection='column' alignItems='center' width={380} height={370} bgcolor='#fff' >
        <img src={Logo} alt="Descrição da Imagem" style={{ marginTop: '8px', width: 'auto', height: 'auto' }} />
        <form onSubmit={onSubmit(handleSubmit)}>
          <Box marginTop="20px">
            <TextField
              label="Usuario"
              size='small'
              fullWidth
              {...register("name_user")}
            />
            <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
          </Box>

          <Box marginTop="20px">
            <TextField
              label="Senha"
              type="password"
              size='small'
              fullWidth
              {...register("password")}
              color="secondary"
            />
            <Typography variant='subtitle2'>{errors?.password?.message}</Typography>
          </Box>
          <Box marginTop="20px">
            <Button type='submit' variant='contained' sx={{
              backgroundColor: '#1A3433 !important',  // Cor de fundo inicial
              color: '#fff !important',               // Cor da fonte inicial
              '&:hover': {
                backgroundColor: '#fff !important',   // Cor de fundo quando hover
                color: '#1A3433 !important',          // Cor da fonte quando hover
              },
              '&:active': {
                backgroundColor: '#fff !important',   // Cor de fundo quando clicado
                color: '#1A3433 !important',          // Cor da fonte quando clicado
              }
            }} fullWidth>Enviar</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )

}

export default Login;