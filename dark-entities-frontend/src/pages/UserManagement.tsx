import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

interface User {
  id: number;
  email: string;
  name: string;
  last_name: string;
  birthdate: string;
  role: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/users`);
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setOpenEdit(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    await axios.delete(`${API_BASE_URL}/users/${id}`);
    fetchUsers();
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    await axios.put(`${API_BASE_URL}/users/${editUser.id}`, editUser);
    setOpenEdit(false);
    fetchUsers();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Gestión de Usuarios
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ background: "#18122b2a" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Fecha de nacimiento</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.birthdate}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleEdit(user)} size="small">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton onClick={() => handleDelete(user.id)} size="small" color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Diálogo de edición */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar usuario</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 320 }}>
          <TextField
            label="Nombre"
            value={editUser?.name || ""}
            onChange={e => setEditUser(u => u ? { ...u, name: e.target.value } : u)}
            fullWidth
          />
          <TextField
            label="Apellido"
            value={editUser?.last_name || ""}
            onChange={e => setEditUser(u => u ? { ...u, last_name: e.target.value } : u)}
            fullWidth
          />
          <TextField
            label="Fecha de nacimiento"
            type="date"
            value={editUser?.birthdate || ""}
            onChange={e => setEditUser(u => u ? { ...u, birthdate: e.target.value } : u)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Rol"
            value={editUser?.role || ""}
            onChange={e => setEditUser(u => u ? { ...u, role: e.target.value } : u)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}