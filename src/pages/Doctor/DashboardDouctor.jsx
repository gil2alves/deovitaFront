import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardDashboard } from '../../components';
import Agenda from '../../image/agenda.svg'
import UsersService from '../../services/UsersService';
import { useDispatch } from 'react-redux';


// import { Container } from './styles';

function DashboardDouctor() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || {});
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleStartConsultation = () => {
    navigate('/nova/consulta');
  };


  return (
    <Box>

      <Box component={Paper} elevation={5} padding={2}>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Typography variant='h3'>Olá Dr: {user.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={5}></Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="contained"
              onClick={handleStartConsultation}
              sx={{
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
              }}
            >
              iniciar consulta
            </Button>

          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}

export default DashboardDouctor;
