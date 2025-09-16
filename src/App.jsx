import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PermisosVistaProvider } from './contexts/PermisosVistaContext';
import GlobalStyles from './styles/GlobalStyles';

// Importar páginas principales
import Inicio from './paginas/publicas/Inicio';
import Proyectos from './paginas/publicas/Proyectos';
import Donaciones from './paginas/publicas/Donaciones';
import Institucional from './paginas/publicas/Institucional';

// Importar páginas de ACCIONES CONSTITUCIONALES Y JURÍDICAS
import AccionTutela from './paginas/publicas/acciones-constitucionales/AccionTutela';
import AccionCumplimiento from './paginas/publicas/acciones-constitucionales/AccionCumplimiento';
import AccionPopular from './paginas/publicas/acciones-constitucionales/AccionPopular';
import AccionGrupo from './paginas/publicas/acciones-constitucionales/AccionGrupo';
import DemandaJuridica from './paginas/publicas/acciones-constitucionales/DemandaJuridica';
import AccionNulidad from './paginas/publicas/acciones-constitucionales/AccionNulidad';
import AccionReparacionDirecta from './paginas/publicas/acciones-constitucionales/AccionReparacionDirecta';

// Importar páginas de MECANISMOS DE PARTICIPACIÓN CIUDADANA
import ConsultaPopular from './paginas/publicas/participacion-ciudadana/ConsultaPopular';
import Referendo from './paginas/publicas/participacion-ciudadana/Referendo';
import Plebiscito from './paginas/publicas/participacion-ciudadana/Plebiscito';
import Manifiesto from './paginas/publicas/participacion-ciudadana/Manifiesto';

// Importar páginas de INSTRUMENTOS DE CONTROL SOCIAL
import PQRSFD from './paginas/publicas/control-social/PQRSFD';

// Importar páginas de MECANISMOS TERRITORIALES ESPECIALIZADOS
import ConsejoVeeduriaTerritorial from './paginas/publicas/territoriales/ConsejoVeeduriaTerritorial';

// Importar páginas de MECANISMOS INNOVADORES Y DE VEEDURÍA TERRITORIAL
import GeoDashboard from './paginas/publicas/innovadores/GeoDashboard';
import AuditoriaForense from './paginas/publicas/innovadores/AuditoriaForense';
import Monitor from './paginas/publicas/innovadores/Monitor';

// Importar páginas de INVESTIGACIÓN ADMINISTRATIVA, PENAL Y DISCIPLINARIA
import ConsejoIA from './paginas/publicas/ConsejoIA';

// Importar páginas de MECANISMOS ÉTNICOS Y DIFERENCIALES
import PlanesEtnodesarrollo from './paginas/publicas/etnicos/PlanesEtnodesarrollo';
import Noticias from './paginas/compartidas/Noticias';
import Documentos from './paginas/compartidas/Documentos';
import Contacto from './paginas/compartidas/Contacto';
import Ayuda from './paginas/compartidas/Ayuda';
import Terminos from './paginas/compartidas/Terminos';
import DashboardCliente from './paginas/cliente/Dashboard';
import PanelSeguimientoCasos from './paginas/cliente/PanelSeguimientoCasos';
import TareasARealizar from './paginas/cliente/TareasARealizar';
import DashboardOperador from './paginas/operador/Dashboard';
import TareasAsignadas from './paginas/operador/TareasAsignadas';
import CentroGestionLegal from './paginas/operador/CentroGestionLegal';
import PanelTareas from './paginas/operador/PanelTareas';
import DashboardAdministrador from './paginas/administrador/Dashboard';
import MenuPrincipal from './components/compartidas/MenuPrincipal';
import Footer from './components/Footer';
import AdminDonaciones from './paginas/administrador/AdminDonaciones';
import AdminRegistros from './paginas/administrador/AdminRegistros';
import PanelActividades from './paginas/administrador/PanelActividades';
import GestionActividades from './paginas/administrador/GestionActividades';
import HojaRecursos from './paginas/administrador/HojaRecursos';
import AnalisisPreciosUnitarios from './paginas/administrador/AnalisisPreciosUnitarios';
import PresupuestoActividad from './paginas/administrador/PresupuestoActividad';
import ConvocatoriasTareas from './paginas/administrador/ConvocatoriasTareas';
import GestionRecursosHumanos from './paginas/administrador/GestionRecursosHumanos';
import ControlPermisosVista from './paginas/administrador/ControlPermisosVista';
import MantenimientoSistema from './paginas/administrador/MantenimientoSistema';
import ValidarFuncionariosEntidades from './paginas/administrador/ValidarFuncionariosEntidades';
import GestionarRolesUsuarios from './paginas/administrador/GestionarRolesUsuarios';
import ConvocatoriasPublicas from './paginas/compartidas/ConvocatoriasPublicas';

function App() {
  return (
    <AuthProvider>
      <PermisosVistaProvider>
        <BrowserRouter>
          <GlobalStyles />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MenuPrincipal />
            <main style={{ flex: 1 }}>
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<Inicio />} />
              
              {/* Rutas públicas */}
              <Route path="/institucional" element={<Institucional />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/donaciones" element={<Donaciones />} />
              <Route path="/pqrsfd" element={<PQRSFD />} />
              <Route path="/accion-tutela" element={<AccionTutela />} />
              <Route path="/accion-cumplimiento" element={<AccionCumplimiento />} />
              <Route path="/accion-popular" element={<AccionPopular />} />
              <Route path="/accion-grupo" element={<AccionGrupo />} />
              <Route path="/demanda-juridica" element={<DemandaJuridica />} />
              <Route path="/accion-nulidad" element={<AccionNulidad />} />
              <Route path="/accion-reparacion-directa" element={<AccionReparacionDirecta />} />
              <Route path="/consejo-veeduria-territorial" element={<ConsejoVeeduriaTerritorial />} />
              <Route path="/consulta-popular" element={<ConsultaPopular />} />
              <Route path="/referendo" element={<Referendo />} />
              <Route path="/plebiscito" element={<Plebiscito />} />
              <Route path="/planes-etnodesarrollo" element={<PlanesEtnodesarrollo />} />
              <Route path="/consejo-ia" element={<ConsejoIA />} />
              <Route path="/geo-dashboard" element={<GeoDashboard />} />
              <Route path="/auditoria-forense" element={<AuditoriaForense />} />
              <Route path="/manifiesto" element={<Manifiesto />} />
              <Route path="/monitor" element={<Monitor />} />
              
              {/* Rutas compartidas */}
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ayuda" element={<Ayuda />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/convocatorias" element={<ConvocatoriasPublicas />} />
              
              {/* Rutas de Cliente */}
              <Route path="/cliente/dashboard" element={<DashboardCliente />} />
              <Route path="/cliente/seguimiento-casos" element={<PanelSeguimientoCasos />} />
              <Route path="/cliente/tareas-a-realizar" element={<TareasARealizar />} />
              
              {/* Rutas de Operador */}
              <Route path="/operador/dashboard" element={<DashboardOperador />} />
              <Route path="/operador/tareas-asignadas" element={<TareasAsignadas />} />
              <Route path="/operador/centro-gestion-legal" element={<CentroGestionLegal />} />
              <Route path="/operador/panel-tareas" element={<PanelTareas />} />
              
              {/* Rutas de Administrador */}
              <Route path="/admin/dashboard" element={<DashboardAdministrador />} />
              <Route path="/admin/donaciones" element={<AdminDonaciones />} />
              <Route path="/admin/registros" element={<AdminRegistros />} />
              <Route path="/admin/control-permisos-vista" element={<ControlPermisosVista />} />
              <Route path="/admin/validar-funcionarios-entidades" element={<ValidarFuncionariosEntidades />} />
              <Route path="/admin/gestionar-roles-usuarios" element={<GestionarRolesUsuarios />} />
              <Route path="/admin/mantenimiento-sistema" element={<MantenimientoSistema />} />
              <Route path="/admin/panel-actividades" element={<PanelActividades />} />
              <Route path="/admin/gestion-actividades" element={<GestionActividades />} />
              <Route path="/admin/hoja-recursos" element={<HojaRecursos />} />
              <Route path="/admin/analisis-precios" element={<AnalisisPreciosUnitarios />} />
              <Route path="/admin/presupuesto-actividad" element={<PresupuestoActividad />} />
              <Route path="/admin/convocatorias-tareas" element={<ConvocatoriasTareas />} />
              <Route path="/admin/gestion-recursos-humanos" element={<GestionRecursosHumanos />} />
            </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </PermisosVistaProvider>
    </AuthProvider>
  );
}

export default App;