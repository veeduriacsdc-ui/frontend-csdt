// SERVICIO DE CHAT MEJORADO - CSDT
// Sistema de chat integrado para el Consejo Social de Veeduría y Desarrollo Territorial

class ChatGPTMejoradoService {
  
  // Configuración del sistema
  static configuracion = {
    version: '1.0.0',
    nombre: 'Chat CSDT',
    descripcion: 'Sistema de chat para el Consejo Social de Veeduría y Desarrollo Territorial',
    especialidades: ['derecho_constitucional', 'derecho_administrativo', 'derecho_penal', 'derecho_civil']
  };

  // Prompts básicos para el chat
  static promptsBasicos = {
    derecho_constitucional: {
      sistema: `Eres un asistente jurídico especializado en derecho constitucional colombiano. 
      Ayuda a los usuarios del Consejo Social de Veeduría y Desarrollo Territorial con consultas sobre:
      - Acciones constitucionales (Tutela, Cumplimiento, Popular)
      - Derechos fundamentales
      - Procedimientos constitucionales
      
      Responde de manera clara y profesional, citando las normas aplicables.`,
      usuario: `Consulta sobre derecho constitucional: {consulta}`
    },
    derecho_administrativo: {
      sistema: `Eres un asistente jurídico especializado en derecho administrativo colombiano.
      Ayuda con consultas sobre:
      - Actos administrativos
      - Procedimientos administrativos
      - Contratación estatal
- Responsabilidad del Estado
      
      Proporciona información clara y precisa sobre los procedimientos aplicables.`,
      usuario: `Consulta sobre derecho administrativo: {consulta}`
    },
    derecho_penal: {
      sistema: `Eres un asistente jurídico especializado en derecho penal colombiano.
      Ayuda con consultas sobre:
      - Delitos y contravenciones
      - Proceso penal
      - Derechos de las víctimas
      - Medidas cautelares
      
      Brinda orientación sobre los procedimientos penales aplicables.`,
      usuario: `Consulta sobre derecho penal: {consulta}`
    },
    derecho_civil: {
      sistema: `Eres un asistente jurídico especializado en derecho civil colombiano.
      Ayuda con consultas sobre:
      - Responsabilidad civil
      - Contratos civiles
      - Derechos reales
- Sucesiones
      
      Proporciona información sobre los procedimientos civiles aplicables.`,
      usuario: `Consulta sobre derecho civil: {consulta}`
    }
  };

  // Generar respuesta básica para el chat
  static generarRespuesta(consulta, tipoConsulta = 'derecho_constitucional') {
    const prompt = this.promptsBasicos[tipoConsulta];
    
    if (!prompt) {
      return {
        respuesta: 'Lo siento, no puedo procesar este tipo de consulta en este momento.',
        tipo: 'error',
        fecha: new Date().toISOString()
      };
    }

    // Simular respuesta del chat (en producción se conectaría con una API real)
    const respuestaSimulada = this.simularRespuesta(consulta, tipoConsulta);
    
    return {
      respuesta: respuestaSimulada,
      tipo: tipoConsulta,
      fecha: new Date().toISOString(),
      configuracion: this.configuracion
    };
  }

  // Simular respuesta del chat
  static simularRespuesta(consulta, tipoConsulta) {
    const respuestasBase = {
      derecho_constitucional: `Basándome en tu consulta sobre derecho constitucional, te recomiendo revisar:

1. **Constitución Política de Colombia** - Artículos 86-90 (Acciones Constitucionales)
2. **Ley 1757 de 2015** - Participación Ciudadana
3. **Ley 850 de 2003** - Veedurías Ciudadanas

Para casos específicos, considera:
- Acción de Tutela (Art. 86 C.P.) para protección inmediata de derechos
- Acción de Cumplimiento (Art. 87 C.P.) para hacer cumplir leyes
- Acción Popular (Art. 88 C.P.) para proteger intereses colectivos

¿Necesitas información más específica sobre algún procedimiento?`,

      derecho_administrativo: `Para tu consulta sobre derecho administrativo, considera:

1. **Código de Procedimiento Administrativo** - Procedimientos generales
2. **Ley 1437 de 2011** - Código de Procedimiento Administrativo y de lo Contencioso Administrativo
3. **Ley 80 de 1993** - Estatuto General de Contratación

Procedimientos recomendados:
- Recurso de reposición (5 días hábiles)
- Recurso de apelación (10 días hábiles)
- Acción de nulidad y restablecimiento del derecho

¿Te gustaría conocer más detalles sobre algún procedimiento específico?`,

      derecho_penal: `Para consultas de derecho penal, ten en cuenta:

1. **Código Penal Colombiano** - Tipificación de delitos
2. **Código de Procedimiento Penal** - Procedimientos
3. **Ley 906 de 2004** - Sistema Penal Acusatorio

Opciones disponibles:
- Denuncia penal ante Fiscalía
- Querella ante Juez de Control de Garantías
- Acción de reparación directa

¿Necesitas orientación sobre algún procedimiento penal específico?`,

      derecho_civil: `Para consultas de derecho civil, considera:

1. **Código Civil Colombiano** - Normas sustanciales
2. **Código General del Proceso** - Procedimientos civiles
3. **Ley 1564 de 2012** - Código General del Proceso

Acciones civiles disponibles:
- Acción de responsabilidad civil
- Acción de cumplimiento de contrato
- Acción de restitución

¿Te interesa conocer más sobre algún procedimiento civil específico?`
    };

    return respuestasBase[tipoConsulta] || 'Consulta recibida. Un especialista te contactará pronto.';
  }

  // Obtener tipos de consulta disponibles
  static obtenerTiposConsulta() {
    return Object.keys(this.promptsBasicos).map(tipo => ({
      valor: tipo,
      etiqueta: tipo.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
  }

  // Validar consulta
  static validarConsulta(consulta) {
    if (!consulta || consulta.trim().length < 10) {
      return {
        valida: false,
        mensaje: 'La consulta debe tener al menos 10 caracteres'
      };
    }

    if (consulta.length > 1000) {
      return {
        valida: false,
        mensaje: 'La consulta no puede exceder 1000 caracteres'
      };
    }

    return {
      valida: true,
      mensaje: 'Consulta válida'
    };
  }
}

export default ChatGPTMejoradoService;
