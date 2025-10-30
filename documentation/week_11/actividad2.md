# Actividad 2: Evaluación de Usabilidad, Accesibilidad y Psicología del Color

**Proyecto Evaluado:** Sistema Judicial - Buscador y Gestor de Documentos Legales  
**Tipo de Sistema:** Aplicación web full-stack para gestión de documentos judiciales  
**Tecnologías:** Next.js 15 + React 19, FastAPI + Python, PostgreSQL, Qdrant  
**Fecha de Evaluación:** Octubre 30, 2025  

## 📋 Checklist de Evaluación

### A. Usabilidad según Nielsen (1 punto por ítem)

| Nº | Principio de Usabilidad | Criterio observado | Cumplimiento | Comentario |
|----|------------------------|-------------------|-------------|------------|
| 1 | Visibilidad del estado del sistema | El sistema informa claramente las acciones, procesos y estados al usuario. | ✅ | Excelente implementación con indicadores de progreso visuales (barra de carga con iconos), estados de procesamiento (subiendo, analizando, completado) y notificaciones toast para operaciones CRUD. |
| 2 | Correspondencia entre el sistema y el mundo real | El lenguaje, íconos y flujos son familiares y coherentes con el dominio del usuario. | ✅ | Uso apropiado de terminología jurídica (expediente, delito, veredicto), iconos judiciales (Scale de justicia) y flujos que simulan procesos judiciales reales. |
| 3 | Control y libertad del usuario | Permite deshacer y rehacer acciones fácilmente. | ✅ | Navegación libre con navbar siempre visible, opción de cancelar en formularios, confirmaciones para acciones destructivas, y edición manual de metadatos extraídos por IA. |
| 4 | Consistencia y estándares | Los elementos de interfaz mantienen coherencia en estilo, color, tipografía y comportamiento. | ✅ | Patrón consistente de cards, botones uniformes, paleta de colores coherente, tipografía Geist consistente, y comportamientos predecibles en toda la aplicación. |
| 5 | Prevención de errores | Evita acciones erróneas mediante validaciones y confirmaciones. | ✅ | Validación de tipo de archivo (solo PDF), límites de tamaño, confirmaciones para eliminación, estados disabled en botones durante procesos, y validación de formularios. |
| 6 | Reconocer antes que recordar | Minimiza la carga cognitiva mostrando opciones visibles y menús claros. | ✅ | Labels descriptivos en todos los campos, opciones visibles en navegación, información contextual en formularios, y estructura de menú clara sin necesidad de memorizar comandos. |
| 7 | Flexibilidad y eficiencia de uso | Permite atajos o personalización para usuarios frecuentes. | ⚠️ | Búsqueda en tiempo real eficiente, pero carece de atajos de teclado explícitos y opciones avanzadas de filtrado. Los usuarios frecuentes pueden beneficiarse de más personalización. |
| 8 | Diseño estético y minimalista | La interfaz es limpia y evita información irrelevante. | ✅ | Diseño limpio con jerarquía visual clara, uso generoso de espacio blanco, información esencial priorizada, y ausencia de elementos distractores o información innecesaria. |
| 9 | Ayuda para reconocer, diagnosticar y recuperar errores | Los mensajes de error son claros y orientan la solución. | ✅ | Mensajes de error específicos y accionables ("selecciona un archivo PDF válido"), estados visuales claros para errores, y opciones de recuperación (reintentar carga). |
| 10 | Ayuda y documentación | Incluye ayuda contextual o tutorial accesible. | ⚠️ | Ayuda contextual básica en formularios, pero falta documentación completa, tutoriales interactivos o sistema de ayuda avanzado. El README existe pero no está integrado en la aplicación. |

**Puntuación Nielsen:** 9/10 (9 ✅, 1 ⚠️)

### B. Accesibilidad (según WCAG 2.1 nivel AA)

| Nº | Principio WCAG | Criterio observado | Cumplimiento | Comentario |
|----|---------------|-------------------|-------------|------------|
| 1 | Perceptible | Contraste de color adecuado (mín. 4.5:1), uso de texto alternativo en imágenes. | ⚠️ | Contraste generalmente bueno (texto primario #164e63 sobre blanco cumple ratio >7:1), pero faltan textos alternativos en iconos decorativos. Algunos elementos con bajo contraste en estados muted. |
| 2 | Operable | Navegable mediante teclado y con foco visible. | ⚠️ | Los formularios tienen labels asociados y botones son focusables, pero no se verificó navegación completa por teclado ni indicadores de foco visibles en todos los elementos interactivos. |
| 3 | Comprensible | Los formularios y etiquetas son claros y predecibles. | ✅ | Labels claros y descriptivos, comportamiento predecible de formularios, estructura lógica de navegación, y lenguaje consistente en toda la interfaz. |
| 4 | Robusto | Compatible con lectores de pantalla y dispositivos móviles. | ⚠️ | HTML semántico moderno, pero falta atributos ARIA específicos, roles explícitos, y no se verificó compatibilidad con lectores de pantalla. Diseño responsivo adecuado para móviles. |

**Puntuación WCAG:** 2/4 (1 ✅, 3 ⚠️)

### C. Psicología del Color

| Nº | Criterio | Cumplimiento | Comentario |
|----|----------|-------------|------------|
| 1 | La paleta de colores transmite emociones acordes al propósito del sistema (confianza, energía, calma, etc.). | ✅ | Excelente selección: Azul primario (#164e63) transmite confianza y autoridad judicial, teal secundario (#0f766e) aporta estabilidad profesional, blanco puro simboliza imparcialidad y pureza legal. |
| 2 | Los colores se utilizan coherentemente para resaltar acciones principales y secundarias. | ✅ | Uso consistente: primario para acciones principales (botones subir/analizar), secundario para estados de éxito, rojo para errores/destrucción, gris para elementos neutrales. Jerarquía visual clara. |
| 3 | El contraste entre fondo y texto facilita la lectura y comprensión. | ✅ | Contraste excelente entre texto oscuro (#475569) y fondo blanco, texto blanco sobre fondos oscuros. Ratios de contraste cumplen estándares de legibilidad. |
| 4 | El uso de color respeta consideraciones de daltonismo o visión reducida. | ⚠️ | Consideración básica pero insuficiente: evita combinaciones problemáticas rojo/verde en estados, pero no implementa patrones adicionales (texturas, formas) para usuarios con deficiencias de color. |

**Puntuación Color:** 3/4 (3 ✅, 1 ⚠️)

## 📊 Resumen de Evaluación

### Fortalezas Identificadas
- **Usabilidad Excelente:** 9/10 en heurísticas Nielsen, especialmente en feedback visual y consistencia
- **Diseño Profesional:** Paleta de colores apropiada para dominio judicial, estética minimalista efectiva
- **Experiencia de Usuario:** Flujos intuitivos, prevención de errores robusta, control de usuario adecuado
- **Funcionalidad Completa:** Sistema CRUD funcional con IA integrada

### Deficiencias Principales
- **Accesibilidad Limitada:** Falta textos alternativos, navegación por teclado no verificada, atributos ARIA ausentes
- **Ayuda y Documentación:** Sistema de ayuda básico, falta integración de documentación completa
- **Accesibilidad al Color:** No considera completamente daltonismo con patrones redundantes

### Recomendaciones de Mejora

#### Prioridad Alta (Accesibilidad)
1. **Agregar textos alternativos:** Implementar `alt` en todos los iconos e imágenes
2. **Navegación por teclado:** Verificar y mejorar foco visible, orden de tabulación lógico
3. **Atributos ARIA:** Agregar roles, labels, y descripciones para lectores de pantalla

#### Prioridad Media (Usabilidad)
1. **Sistema de ayuda integrado:** Crear tutoriales contextuales y documentación in-app
2. **Atajos de teclado:** Implementar shortcuts para usuarios frecuentes (Ctrl+S para guardar, etc.)
3. **Búsqueda avanzada:** Filtros adicionales por fecha, veredicto, tipo de delito

#### Prioridad Baja (Psicología del Color)
1. **Patrones redundantes:** Agregar texturas o formas además de color para estados críticos
2. **Tema alternativo:** Considerar modo oscuro para reducción de fatiga visual

### Conclusión
El sistema demuestra una **usabilidad muy sólida** (90% cumplimiento Nielsen) con un diseño centrado en el usuario efectivo para el dominio judicial. Las principales áreas de mejora se concentran en **accesibilidad** (50% cumplimiento WCAG), que debe abordarse para cumplir estándares modernos de inclusión digital. La psicología del color está bien implementada (75%) pero puede refinarse para mayor accesibilidad universal.

**Puntuación Global:** 7.5/10  
**Recomendación:** Sistema usable y funcional, requiere mejoras en accesibilidad para cumplimiento WCAG completo.</content>
<parameter name="filePath">e:\a\judicial-app\actividad2.md