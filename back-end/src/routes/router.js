import { Router } from "express";
import ClienteController from "../controllers/ClienteControllers.js";
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentosControllers.js";
import DashboardController from "../controllers/DashboardController.js";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/login', (req, res) => authController.login(req, res))
router.use(authMiddleware);
//ROTAS PARA AUTH
router.post('/logout', (req, res)=> authController.logout(req,res));
router.post('/me', (req, res)=> authController.me(req,res));

//Rotas para CLIENTES
router.get('/clientes', (req, res) => ClienteController.listar(req, res));
//router.get('/clientes/:id', (req, res) => ClienteController.buscarPorId(req, res));
router.post('/clientes', (req, res) => ClienteController.criar(req, res));
router.put('/clientes/:id', (req, res) => ClienteController.editarCliente(req, res));
router.delete('/clientes/:id', (req, res) => ClienteController.deletarCliente(req, res));

// Rotas para Veículos
router.get('/veiculos', (req, res) => VeiculoController.listar(req,res));
router.post('/veiculos', (req, res) => VeiculoController.criar(req, res));
router.put('/veiculos/:id', (req, res)=> VeiculoController.editar(req, res));

// Rotas para agendamentos
router.get('/agendamentos', (req, res) => AgendamentoController.listar(req, res));
router.post('/agendamentos/criar', (req, res) => AgendamentoController.criar(req, res));
router.patch('/agendamento/:id/editar', (req, res) => AgendamentoController.editarData(req, res));

// ROTAS PARA DASHBOARD
router.get('/dashboard/resumo', (req, res)=> DashboardController.resumo(req, res));

export default router; 