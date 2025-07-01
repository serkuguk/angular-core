# angular-core

Angular

- angular version 20
- rxjs version 7
- type script 5

Structure folders
app/

- components/
  Directorio adicional para componentes. Según la descripción, contiene “componentes técnicos generales”. Tal vez aquí
  se ubiquen pequeños componentes auxiliares que no están directamente relacionados con funcionalidades de negocio o con
  la biblioteca de UI, o componentes que se usan en varios lugares pero que no encajan del todo en shared. No se ha
  descrito claramente el propósito de esta carpeta en el README, por lo que conviene revisarlo dentro del proyecto. En
  algunos casos, se usa esta carpeta para componentes globales de la aplicación (por ejemplo, AppComponent o widgets
  específicos).

- core/
  Módulo Core: aquí se concentran los servicios y componentes de uso global en todo el sistema.
  Normalmente, en core se colocan servicios singleton (por ejemplo, autorización),
  utilidades generales, interceptores HTTP, así como componentes únicos que están presentes en
  todas las páginas (como el encabezado o el pie de página).
  El módulo Core se importa solo en el módulo raíz de la aplicación (AppModule),
  evitando su importación en otros módulos para que los servicios en Core mantengan su instancia única.

- features/
  Contiene módulos de características (features), que son conjuntos de componentes relacionados con áreas
  funcionales específicas de la aplicación. Según la estructura, aquí se encuentran componentes “tontos” (
  presentational) que implementan la lógica de visualización para funciones individuales. Estos componentes reciben
  datos a través de @Input/@Output y no se encargan de cargar datos por sí mismos; la lógica de obtención de datos
  se ubica en niveles superiores.
  Cada módulo feature probablemente corresponde a una función o entidad concreta (por ejemplo, perfil de usuario,
  panel de administrador, etc.) e incluye los componentes UI relacionados. Este enfoque sigue la arquitectura
  moderna basada en funciones (feature-based) de Angular: se recomienda crear un módulo separado para cada función
  importante del proyecto dentro de features, lo cual hace que el código sea más independiente y enfocado en una
  sola tarea. Los componentes de features pueden conectarse a diferentes páginas si una funcionalidad se usa en
  varias secciones de la interfaz.

- layouts/
  Contiene componentes de diseño (layout) de la aplicación. Aquí pueden estar los componentes que definen la estructura
  común de las páginas (por ejemplo, plantillas distintas para páginas de inicio de sesión y del panel principal).
  Separar los layouts mejora la reutilización de la estructura: en lugar de duplicar la cabecera/menú en cada página,
  estas pueden usar un layout común. Probablemente, los layouts están implementados como componentes auxiliares o
  módulos incluidos en las páginas.

- pages/
  Aquí se ubican los componentes “inteligentes” (smart), es decir, las páginas de la aplicación. Cada página, por lo
  general, representa un componente contenedor (a menudo vinculado a una ruta) con su lógica de negocio. Los
  componentes smart se encargan de cargar datos (mediante servicios o NgRx), manejar acciones del usuario y vincular
  datos con componentes presentacionales (de features/shared).
  La estructura del proyecto separa las "páginas" de los "componentes funcionales", implementando el patrón popular
  Contenedor/Presentacional (Container/Presentational). Según este patrón, el componente contenedor (la página) sabe
  cómo obtener los datos (por ejemplo, mediante un servicio o el store), y normalmente se asocia a una ruta
  específica, mientras que los componentes presentacionales muestran los datos y generan eventos a través de
  @Output. En este proyecto, la carpeta pages contiene dichos contenedores (smart), que utilizan componentes de
  features/shared. Probablemente, cada página tiene su propio módulo (PageModule) y ruta, lo cual permite su carga
  perezosa (lazy loading).

- shared/
  Módulo Shared: contiene componentes reutilizables, directivas y pipes que pueden usarse en distintas partes de la
  aplicación. Estos componentes de presentación (UI) no están ligados a una lógica de negocio específica y sirven
  como bloques comunes de interfaz. Separarlos en SharedModule sigue las mejores prácticas de Angular: “los
  componentes, directivas y pipes que se usan en diferentes módulos deben almacenarse en un módulo compartido (
  Shared)”.
  Es importante que SharedModule no contenga servicios, para evitar la creación de instancias duplicadas al
  importarlo en módulos cargados perezosamente (lazy-loaded).

- store/
  Contiene el estado de la aplicación basado en NgRx (modelo Redux). Aquí probablemente se definen actions, reducers,
  effects y selectors para el estado global. En el README se menciona explícitamente el uso de @ngrx/store, lo que
  indica que el proyecto sigue una arquitectura tipo Flux para la gestión del estado. La carpeta store puede estar
  dividida en subcarpetas por funcionalidades (session, user, etc.) o contener todo el estado global junto.
  La presencia de esta carpeta indica que el estado está separado de los componentes, lo cual mejora la capacidad de
  prueba y la previsibilidad del comportamiento.

Storage

- ngrx https://ngrx.io/

Icons

- all icons for taigaUI https://lucide.dev/icons/

Libraries

- taiga-ui https://taiga-ui.dev/

Translate

- @ngx-translate/core https://github.com/ngx-translate/core

Testing

- Jest

Jwt

- @auth0/angular-jwt https://www.npmjs.com/package/@auth0/angular-jwt

Installation

- NodeJs version 22.0.0
- pnpm latest

Run core

- pnpm start

Run Jest test

- pnpm test
