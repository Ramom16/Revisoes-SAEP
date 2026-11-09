import { Router } from "express";
import ClienteController from "../controllers/ClienteControllers.js";
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentosControllers.js";

const router = Router();

//router.use(authMiddleware);

//Rotas para CLIENTES
router.get('/clientes', (req, res) => ClienteController.listar(req, res));
//router.get('/clientes/:id', (req, res) => ClienteController.buscarPorId(req, res));
router.post('/clientes', (req, res) => ClienteController.criar(req, res));
//router.put('/clientes/:id', (req, res) => ClienteController.atualizar(req, res));
//router.delete('/clientes/:id', (req, res) => ClienteController.deletar(req, res));

// Rotas para Veículos
router.get('/veiculos', (req, res) => VeiculoController.listar(req,res));

// Rotas para agendamentos
router.get('/agendamentos', (req, res) => AgendamentoController.listar(req, res));
router.post('/agendamentos/criar', (req, res) => AgendamentoController.criar(req, res));

export default router; 