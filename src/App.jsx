import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PermisosVistaProvider } from './contexts/PermisosVistaContext';
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalStyles from './styles/GlobalStyles';

// Importar páginas principales
import Inicio from './paginas/publicas/Inicio';
import Proyectos from './paginas/publicas/Proyectos';
import Donaciones from './paginas/publicas/Donaciones';
import Institucional from './paginas/publicas/Institucional';
import Dashboard from './paginas/Dashboard';

// Importar páginas de autenticación
import Login from './paginas/auth/Login';
import Register from './paginas/auth/Register';

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
// import ConsejoIA from './paginas/publicas/ConsejoIA'; // Comentado - usando nueva versión

// Importar páginas de MECANISMOS ÉTNICOS Y DIFERENCIALES
import PlanesEtnodesarrollo from './paginas/publicas/etnicos/PlanesEtnodesarrollo';
import ConsultaPreviaEtnica from './paginas/etnicos/consulta-previa-etnica/ConsultaPreviaEtnica';
import DerechosEtnicos from './paginas/06-etnico/derechos/DerechosEtnicos';
import TerritoriosAncestrales from './paginas/etnicos/territorios-ancestrales/TerritoriosAncestrales';
import PatrimonioCultural from './paginas/etnicos/patrimonio-cultural/PatrimonioCultural';
import MediacionIntercultural from './paginas/etnicos/mediacion-intercultural/MediacionIntercultural';
import EducacionPropia from './paginas/etnicos/educacion-propia/EducacionPropia';
import HistoriaTerritorio from './paginas/etnicos/historia-territorio/HistoriaTerritorio';
import NarracionesEtnicas from './paginas/etnicos/narraciones-etnicas/NarracionesEtnicas';
import PlanesEtnodesarrolloAvanzado from './paginas/etnicos/planes-etnodesarrollo-avanzado/PlanesEtnodesarrolloAvanzado';
import Noticias from './paginas/compartidas/Noticias';
import Documentos from './paginas/compartidas/Documentos';
import Contacto from './paginas/compartidas/Contacto';
import Ayuda from './paginas/compartidas/Ayuda';
import Terminos from './paginas/compartidas/Terminos';
import DashboardCliente from './paginas/cliente/DashboardCliente';
import PanelSeguimientoCasos from './paginas/cliente/PanelSeguimientoCasos';
import TareasARealizar from './paginas/cliente/TareasARealizar';
import MisVeedurias from './paginas/cliente/MisVeedurias';
import DashboardOperador from './paginas/operador/DashboardOperador';
import TareasAsignadas from './paginas/operador/TareasAsignadas';
import CentroGestionLegal from './paginas/operador/CentroGestionLegal';
import PanelTareas from './paginas/operador/PanelTareas';
import GestionarVeeduriasOperador from './paginas/operador/GestionarVeeduriasOperador';
import GestionarTareasOperador from './paginas/operador/GestionarTareasOperador';
import DashboardAdministrador from './paginas/administrador/Dashboard';
import GestionarUsuarios from './paginas/administrador/GestionarUsuarios';
import GestionarVeedurias from './paginas/administrador/GestionarVeedurias';
import GestionarDonaciones from './paginas/administrador/GestionarDonaciones';
import GestionarTareas from './paginas/administrador/GestionarTareas';
import Estadisticas from './paginas/administrador/Estadisticas';
import MenuPrincipal from './components/compartidas/MenuPrincipal';
import Footer from './components/Footer';
import PageWrapper from './components/compartidas/PageWrapper';
import ConvocatoriasPublicas from './paginas/compartidas/ConvocatoriasPublicas';

// Importar páginas de MEDICINA NATURAL
import MedicinaNatural from './paginas/08-medicina/plantas-medicinales/MedicinaNatural';

// Importar páginas de HERRAMIENTAS IA AVANZADAS
import IaEspecialistas from './paginas/herramientas-ia/especialistas-ia/IaEspecialistas';

// Importar páginas de INNOVACIÓN TECNOLÓGICA
import ConsejoIA from './paginas/07-innovacion/consejo-ia/ConsejoIA';
import ConsejoIAAvanzado from './paginas/07-innovacion/consejo-ia-avanzado/ConsejoIAAvanzado';

// Importar páginas de CONTROL TERRITORIAL
import ControlMineriaPredios from './paginas/control-territorial/ControlMineriaPredios';
import ControlInstituciones from './paginas/control-territorial/ControlInstituciones';
import ControlRegional from './paginas/control-territorial/ControlRegional';

// Importar páginas de JUSTICIA ORDINARIA
import JusticiaCivil from './paginas/02-justicia/ordinaria/civil/JusticiaCivil';
import JusticiaPenal from './paginas/02-justicia/ordinaria/penal/JusticiaPenal';

// Importar páginas de JUSTICIA EXTRAORDINARIA
import JusticiaConstitucional from './paginas/02-justicia/extraordinaria/constitucional/JusticiaConstitucional';

function App() {
  return (
    <AuthProvider>
      <PermisosVistaProvider>
        <NotificationProvider>
          <BrowserRouter>
            <GlobalStyles />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <MenuPrincipal />
              <main style={{ flex: 1, marginTop: '80px', position: 'relative', zIndex: 1 }}>
              <PageWrapper>
              <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<Inicio />} />
              
              {/* Rutas de autenticación */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              
              {/* Dashboard principal */}
              <Route path="/dashboard" element={<Dashboard />} />
              
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
              <Route path="/consulta-previa-etnica" element={<ConsultaPreviaEtnica />} />
              <Route path="/derechos-etnicos" element={<DerechosEtnicos />} />
              <Route path="/territorios-ancestrales" element={<TerritoriosAncestrales />} />
              <Route path="/patrimonio-cultural" element={<PatrimonioCultural />} />
              <Route path="/mediacion-intercultural" element={<MediacionIntercultural />} />
              <Route path="/educacion-propia" element={<EducacionPropia />} />
              <Route path="/historia-territorio" element={<HistoriaTerritorio />} />
              <Route path="/narraciones-etnicas" element={<NarracionesEtnicas />} />
              <Route path="/planes-etnodesarrollo-avanzado" element={<PlanesEtnodesarrolloAvanzado />} />
              <Route path="/medicina-natural" element={<MedicinaNatural />} />
              <Route path="/ia/especialistas" element={<IaEspecialistas />} />
              
              {/* Rutas de Innovación Tecnológica */}
              <Route path="/consejo-ia" element={<ConsejoIA />} />
              <Route path="/consejo-ia-avanzado" element={<ConsejoIAAvanzado />} />
              <Route path="/control-mineria-predios" element={<ControlMineriaPredios />} />
              <Route path="/control-instituciones" element={<ControlInstituciones />} />
              <Route path="/control-regional" element={<ControlRegional />} />
              
              {/* Rutas de Justicia Ordinaria */}
              <Route path="/justicia-civil" element={<JusticiaCivil />} />
              <Route path="/justicia-penal" element={<JusticiaPenal />} />
              
              {/* Rutas de Justicia Extraordinaria */}
              <Route path="/justicia-constitucional" element={<JusticiaConstitucional />} />
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
              <Route path="/cliente/veedurias" element={<MisVeedurias />} />
              <Route path="/cliente/seguimiento-casos" element={<PanelSeguimientoCasos />} />
              <Route path="/cliente/tareas-a-realizar" element={<TareasARealizar />} />
              
              {/* Rutas de Operador */}
              <Route path="/operador/dashboard" element={<DashboardOperador />} />
              <Route path="/operador/veedurias" element={<GestionarVeeduriasOperador />} />
              <Route path="/operador/tareas" element={<GestionarTareasOperador />} />
              <Route path="/operador/tareas-asignadas" element={<TareasAsignadas />} />
              <Route path="/operador/centro-gestion-legal" element={<CentroGestionLegal />} />
              <Route path="/operador/panel-tareas" element={<PanelTareas />} />
              
              {/* Rutas de Administrador */}
              <Route path="/admin/dashboard" element={<DashboardAdministrador />} />
              <Route path="/admin/usuarios" element={<GestionarUsuarios />} />
              <Route path="/admin/veedurias" element={<GestionarVeedurias />} />
              <Route path="/admin/donaciones" element={<GestionarDonaciones />} />
              <Route path="/admin/tareas" element={<GestionarTareas />} />
              <Route path="/admin/estadisticas" element={<Estadisticas />} />
              </Routes>
              </PageWrapper>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </NotificationProvider>
      </PermisosVistaProvider>
    </AuthProvider>
  );
}

export default App;
