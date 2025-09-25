import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Terminos = () => {
  const [seccionActiva, setSeccionActiva] = useState('introduccion');

  const secciones = {
    introduccion: {
      titulo: 'Introducción',
      icono: '📋',
      color: '#3B82F6'
    },
    aceptacion: {
      titulo: 'Aceptación de Términos',
      icono: '✅',
      color: '#10B981'
    },
    servicios: {
      titulo: 'Servicios Ofrecidos',
      icono: '🔧',
      color: '#F59E0B'
    },
    responsabilidades: {
      titulo: 'Responsabilidades',
      icono: '⚖️',
      color: '#EF4444'
    },
    privacidad: {
      titulo: 'Privacidad y Datos',
      icono: '🔒',
      color: '#8B5CF6'
    },
    limitaciones: {
      titulo: 'Limitaciones',
      icono: '⚠️',
      color: '#6B7280'
    },
    modificaciones: {
      titulo: 'Modificaciones',
      icono: '🔄',
      color: '#059669'
    },
    contacto: {
      titulo: 'Contacto',
      icono: '📞',
      color: '#DC2626'
    }
  };

  const contenido = {
    introduccion: `
      BIENVENIDO AL CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL (CSDT)

      Estos términos y condiciones ("Términos") rigen el uso de la plataforma digital del Consejo Social de Veeduría y Desarrollo Territorial (CSDT), una organización sin ánimo de lucro dedicada a promover la transparencia, el control social y la lucha contra la corrupción en Colombia mediante el uso de tecnología avanzada.

      Al acceder y utilizar nuestros servicios, usted acepta cumplir con estos Términos y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.

      INFORMACIÓN GENERAL:
      • Organización: Consejo Social de Veeduría y Desarrollo Territorial (CSDT)
      • NIT: 900.123.456-7
      • Domicilio: Calle 100 #15-60, Oficina 502, Bogotá D.C., Colombia
      • Teléfono: +57 (1) 234-5678
      • Email: legal@csdt.gov.co
      • Sitio Web: www.csdt.gov.co

      Estos términos están sujetos a la legislación colombiana y se rigen por las leyes de la República de Colombia.
    `,
    aceptacion: `
      ACEPTACIÓN DE TÉRMINOS Y CONDICIONES

      Al utilizar la plataforma CSDT, usted declara que:

      1. Ha leído, entendido y acepta estos términos y condiciones en su totalidad.
      2. Es mayor de edad (18 años) o cuenta con la representación legal necesaria.
      3. Tiene la capacidad legal para celebrar este acuerdo.
      4. La información proporcionada es veraz, completa y actualizada.
      5. Se compromete a utilizar los servicios de manera responsable y ética.

      FORMAS DE ACEPTACIÓN:
      • Registro en la plataforma
      • Uso de cualquier servicio ofrecido
      • Descarga de documentos o recursos
      • Participación en actividades del CSDT

      Si usted representa a una organización, declara que tiene la autoridad para vincular a dicha organización a estos términos.

      La aceptación de estos términos es un requisito indispensable para el uso de nuestros servicios. El incumplimiento de estos términos puede resultar en la suspensión o cancelación de su acceso a la plataforma.
    `,
    servicios: `
      SERVICIOS OFRECIDOS POR EL CSDT

      El CSDT proporciona los siguientes servicios a través de su plataforma digital:

      SERVICIOS PRINCIPALES:
      1. Análisis Forense Digital
         • Análisis de documentos oficiales
         • Detección de irregularidades
         • Generación de evidencia certificada
         • Reportes técnicos especializados

      2. Inteligencia Artificial Legal
         • Consejo IA para análisis jurídico
         • Asesoría legal automatizada
         • Análisis de jurisprudencia
         • Generación de dictámenes

      3. Sistema de Denuncias
         • Recepción de denuncias ciudadanas
         • Seguimiento de casos
         • Protección de denunciantes
         • Coordinación con autoridades

      4. Herramientas de Veeduría
         • Dashboard de monitoreo
         • Análisis geoespacial
         • Reportes de transparencia
         • Herramientas de control social

      5. Capacitación y Formación
         • Cursos virtuales
         • Talleres presenciales
         • Material educativo
         • Certificaciones

      SERVICIOS COMPLEMENTARIOS:
      • Soporte técnico
      • Consultoría especializada
      • Investigación aplicada
      • Publicación de documentos

      Todos los servicios son proporcionados de manera gratuita para los ciudadanos y organizaciones sin ánimo de lucro, sujeto a disponibilidad y capacidad operativa.
    `,
    responsabilidades: `
      RESPONSABILIDADES DE LAS PARTES

      RESPONSABILIDADES DEL CSDT:

      1. PRESTACIÓN DE SERVICIOS
         • Proporcionar servicios de calidad y confiabilidad
         • Mantener la plataforma operativa y segura
         • Proteger la información personal de los usuarios
         • Cumplir con estándares de transparencia y ética

      2. PROTECCIÓN DE DATOS
         • Cumplir con la Ley 1581 de 2012 de protección de datos
         • Implementar medidas de seguridad apropiadas
         • Notificar incidentes de seguridad
         • Respetar los derechos de los titulares de datos

      3. TRANSPARENCIA
         • Mantener información actualizada y veraz
         • Publicar reportes de actividades
         • Rendir cuentas sobre el uso de recursos
         • Facilitar el acceso a información pública

      RESPONSABILIDADES DEL USUARIO:

      1. USO ADECUADO
         • Utilizar los servicios para fines legítimos
         • No realizar actividades ilegales o fraudulentas
         • Respetar los derechos de terceros
         • Mantener la confidencialidad de credenciales

      2. INFORMACIÓN VERAZ
         • Proporcionar información veraz y actualizada
         • Notificar cambios en datos personales
         • No proporcionar información falsa o engañosa
         • Responsabilizarse por la información proporcionada

      3. CUMPLIMIENTO LEGAL
         • Cumplir con todas las leyes aplicables
         • Respetar los derechos de propiedad intelectual
         • No interferir con el funcionamiento de la plataforma
         • Reportar actividades sospechosas

      LIMITACIÓN DE RESPONSABILIDAD:
      El CSDT no será responsable por daños indirectos, consecuenciales o lucro cesante, salvo en casos de dolo o culpa grave.
    `,
    privacidad: `
      PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES

      El CSDT se compromete a proteger la privacidad y los datos personales de sus usuarios de acuerdo con la legislación colombiana vigente.

      MARCO LEGAL:
      • Ley 1581 de 2012 - Protección de Datos Personales
      • Decreto 1377 de 2013 - Reglamentación
      • Circular 002 de 2015 - SIC
      • Constitución Política de Colombia

      DATOS RECOLECTADOS:
      1. DATOS DE IDENTIFICACIÓN
         • Nombre completo
         • Número de identificación
         • Fecha de nacimiento
         • Nacionalidad

      2. DATOS DE CONTACTO
         • Dirección de correo electrónico
         • Número de teléfono
         • Dirección física
         • Ciudad de residencia

      3. DATOS DE USO
         • Historial de navegación
         • Actividades en la plataforma
         • Preferencias de usuario
         • Métricas de uso

      4. DATOS DE DENUNCIAS
         • Información del caso
         • Documentos adjuntos
         • Testimonios
         • Evidencia proporcionada

      FINALIDADES DEL TRATAMIENTO:
      • Prestación de servicios
      • Análisis forense digital
      • Seguimiento de casos
      • Mejora de servicios
      • Cumplimiento legal
      • Investigación y estadísticas

      DERECHOS DEL TITULAR:
      1. Conocer, actualizar y rectificar datos
      2. Solicitar prueba de autorización
      3. Revocar autorización
      4. Consultar quejas ante la SIC
      5. Acceder gratuito a datos personales

      MEDIDAS DE SEGURIDAD:
      • Encriptación de datos
      • Control de acceso
      • Auditorías regulares
      • Capacitación del personal
      • Políticas de seguridad

      COMPARTIR INFORMACIÓN:
      Los datos personales solo se comparten con:
      • Autoridades competentes (cuando sea legalmente requerido)
      • Proveedores de servicios (bajo acuerdos de confidencialidad)
      • Organizaciones aliadas (con consentimiento expreso)
    `,
    limitaciones: `
      LIMITACIONES Y RESTRICCIONES

      LIMITACIONES TÉCNICAS:
      1. DISPONIBILIDAD
         • Los servicios pueden experimentar interrupciones por mantenimiento
         • No garantizamos disponibilidad 100% del tiempo
         • Pueden existir limitaciones de capacidad en momentos de alta demanda
         • Los servicios pueden verse afectados por factores externos

      2. COMPATIBILIDAD
         • Requerimos navegadores actualizados
         • Algunas funcionalidades pueden no estar disponibles en todos los dispositivos
         • La velocidad de respuesta depende de la conexión del usuario
         • Pueden existir limitaciones por ubicación geográfica

      LIMITACIONES LEGALES:
      1. ALCANCE DE SERVICIOS
         • No proporcionamos asesoría legal personalizada
         • Los análisis no constituyen dictámenes oficiales
         • No garantizamos resultados específicos en casos judiciales
         • Los servicios están limitados por la legislación colombiana

      2. RESPONSABILIDAD
         • No somos responsables por decisiones basadas en nuestros análisis
         • No garantizamos la validez de información de terceros
         • No somos responsables por el uso indebido de nuestros servicios
         • Nuestra responsabilidad se limita al valor de los servicios prestados

      RESTRICCIONES DE USO:
      1. PROHIBICIONES GENERALES
         • No se permite el uso para actividades ilegales
         • No se permite la interferencia con otros usuarios
         • No se permite la reproducción no autorizada de contenido
         • No se permite el acceso no autorizado a sistemas

      2. PROHIBICIONES ESPECÍFICAS
         • No se permite el envío de información falsa
         • No se permite el spam o correo no deseado
         • No se permite la violación de derechos de propiedad intelectual
         • No se permite la suplantación de identidad

      LIMITACIONES DE GARANTÍA:
      • Los servicios se proporcionan "tal como están"
      • No garantizamos la ausencia de errores
      • No garantizamos la compatibilidad con todos los sistemas
      • Las garantías se limitan a lo expresamente establecido en estos términos
    `,
    modificaciones: `
      MODIFICACIONES DE TÉRMINOS Y SERVICIOS

      DERECHO A MODIFICAR:
      El CSDT se reserva el derecho de modificar estos términos y condiciones, así como los servicios ofrecidos, en cualquier momento y sin previo aviso.

      TIPOS DE MODIFICACIONES:
      1. MODIFICACIONES MENORES
         • Correcciones de redacción
         • Actualizaciones de información de contacto
         • Ajustes menores en políticas
         • Mejoras en la claridad del texto

      2. MODIFICACIONES IMPORTANTES
         • Cambios en servicios ofrecidos
         • Modificaciones en políticas de privacidad
         • Cambios en responsabilidades
         • Actualizaciones de precios o condiciones

      NOTIFICACIÓN DE CAMBIOS:
      Las modificaciones importantes serán notificadas a través de:
      • Notificación en la plataforma
      • Correo electrónico a usuarios registrados
      • Publicación en nuestro sitio web
      • Comunicados oficiales

      ACEPTACIÓN DE MODIFICACIONES:
      1. CONTINUIDAD DEL USO
         • El uso continuado de servicios implica aceptación de cambios
         • Los usuarios deben revisar periódicamente estos términos
         • La no aceptación requiere la discontinuación del uso

      2. DERECHO DE RECHAZO
         • Los usuarios pueden rechazar modificaciones importantes
         • El rechazo implica la terminación de servicios
         • Se proporcionará un período de transición razonable

      VERSIÓN VIGENTE:
      • La versión vigente estará siempre disponible en nuestro sitio web
      • Se mantendrá un historial de versiones anteriores
      • La fecha de última modificación será claramente indicada

      IMPACTO EN SERVICIOS:
      • Las modificaciones pueden afectar funcionalidades existentes
      • Se proporcionará documentación de cambios
      • Se ofrecerá capacitación cuando sea necesario
      • Se mantendrá compatibilidad hacia atrás cuando sea posible

      RESOLUCIÓN DE DISPUTAS:
      En caso de desacuerdo con modificaciones:
      1. Contactar a nuestro equipo legal
      2. Solicitar aclaraciones sobre cambios
      3. Presentar objeciones fundamentadas
      4. Buscar resolución amigable
    `,
    contacto: `
      INFORMACIÓN DE CONTACTO

      Para cualquier consulta, reclamo o comunicación relacionada con estos términos y condiciones, puede contactarnos a través de los siguientes medios:

      INFORMACIÓN GENERAL:
      Consejo Social de Veeduría y Desarrollo Territorial (CSDT)
      NIT: 900.123.456-7

      OFICINA PRINCIPAL:
      Dirección: Calle 100 #15-60, Oficina 502
      Ciudad: Bogotá D.C., Colombia
      Código Postal: 110111
      Teléfono: +57 (1) 234-5678
      Fax: +57 (1) 234-5679

      CORREOS ELECTRÓNICOS:
      • General: contacto@csdt.gov.co
      • Legal: legal@csdt.gov.co
      • Soporte Técnico: soporte@csdt.gov.co
      • Protección de Datos: privacidad@csdt.gov.co
      • Denuncias: denuncias@csdt.gov.co
      • Prensa: prensa@csdt.gov.co

      HORARIOS DE ATENCIÓN:
      • Lunes a Viernes: 8:00 AM - 5:00 PM
      • Sábados: 9:00 AM - 1:00 PM
      • Domingos y Festivos: Cerrado
      • Emergencias: 24/7 a través de línea telefónica

      LÍNEAS TELEFÓNICAS:
      • Línea Nacional Gratuita: 018000-123456
      • Línea Principal: +57 (1) 234-5678
      • WhatsApp: +57 300 123 4567
      • Fax: +57 (1) 234-5679

      OFICINAS REGIONALES:
      MEDELLÍN:
      Carrera 43A #1-50, Torre Ejecutiva
      Teléfono: +57 (4) 567-8901
      Email: medellin@csdt.gov.co

      CALI:
      Avenida 6N #28-30, Edificio Corporativo
      Teléfono: +57 (2) 890-1234
      Email: cali@csdt.gov.co

      BARRANQUILLA:
      Calle 84 #45-23, Centro Empresarial
      Teléfono: +57 (5) 123-4567
      Email: barranquilla@csdt.gov.co

      PROCEDIMIENTOS ESPECÍFICOS:
      1. RECLAMOS Y PETICIONES
         • Email: reclamos@csdt.gov.co
         • Formulario web: www.csdt.gov.co/reclamos
         • Tiempo de respuesta: 15 días hábiles

      2. PROTECCIÓN DE DATOS
         • Email: privacidad@csdt.gov.co
         • Tiempo de respuesta: 10 días hábiles
         • Procedimiento según Ley 1581 de 2012

      3. DENUNCIAS
         • Email: denuncias@csdt.gov.co
         • Línea gratuita: 018000-123456
         • Atención 24/7

      4. MEDIOS DE COMUNICACIÓN
         • Email: prensa@ejemplo.com
         • Teléfono: +57 (1) 234-5678 ext. 123
         • Horario: Lunes a Viernes 8:00 AM - 6:00 PM

      IDIOMAS DE ATENCIÓN:
      • Español (principal)
      • Inglés (disponible en oficinas principales)
      • Lenguas indígenas (por solicitud especial)

      Última actualización: 15 de enero de 2024
    `
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Términos y Condiciones
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Conoce nuestros términos de uso y políticas del CSDT
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Navegación de Secciones */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px'
          }}>
            {Object.entries(secciones).map(([key, seccion]) => (
              <button
                key={key}
                onClick={() => setSeccionActiva(key)}
                style={{
                  background: seccionActiva === key 
                    ? `linear-gradient(135deg, ${seccion.color} 0%, ${seccion.color}dd 100%)`
                    : '#f8fafc',
                  color: seccionActiva === key ? 'white' : '#374151',
                  border: seccionActiva === key ? 'none' : '2px solid #e5e7eb',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '14px' }}>{seccion.icono}</span>
                {seccion.titulo}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de la Sección Activa */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '35px',
              marginRight: '20px'
            }}>
              {secciones[seccionActiva].icono}
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0
            }}>
              {secciones[seccionActiva].titulo}
            </h3>
          </div>
          
          <div style={{
            fontSize: '15px',
            color: '#374151',
            lineHeight: '1.8',
            whiteSpace: 'pre-line'
          }}>
            {contenido[seccionActiva]}
          </div>
        </div>

        {/* Información Importante */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Información Importante
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📅</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Vigencia
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Estos términos están vigentes desde el 15 de enero de 2024
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚖️</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Legislación
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Se rigen por las leyes de la República de Colombia
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🔄</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Actualizaciones
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Se actualizan periódicamente. Revisa regularmente
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📞</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Contacto Legal
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                legal@csdt.gov.co - +57 (1) 234-5678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminos;
