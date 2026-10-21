/**
 * @file App.tsx
 * @description Main entry point for the React application.
 * This project serves as the coding repository for the book "Acing the Frontend Interview".
 * To run a specific example, use the following command:
 *   VITE_NAME=<ExampleName> npm run dev
 * Replace <ExampleName> with the desired example name.
 * @author Jennifer Fu
 */
import { lazy, Suspense } from 'react';
import BlogPostApp from './use-cases/BlogPostApp';
import BlogPostExample from './use-cases/BlogPostExample';
import ContextApiExample from './use-cases/ContextApiExample';
import CssSpecificityExample from './use-cases/CssSpecificityExample';
import DebounceExample from './use-cases/DebounceExample';
import DragAndDrop from './components/drag-and-drop/DragAndDrop';
import FaviconExample from './use-cases/FaviconExample';
import FormAdvanced from './components/form/FormAdvanced';
import FormSimple from './components/form/FormSimple';
import GenericConstraintsExample from './use-cases/GenericConstraintsExample';
import GenericListExample from './use-cases/GenericListExample';
import LRUDemo from './use-cases/LRUDemo';
import ModularRouteApp from './use-cases/ModularRouteApp';
import NestedRoutesExample from './use-cases/NestedRoutesExample';
import PropDrillingExample from './use-cases/PropDrillingExample';
import ProtectedRouteExample from './use-cases/ProtectedRouteExample';
import ReactRouterExample from './use-cases/ReactRouterExample';
import RenderComponentExample from './use-cases/RenderComponentExample';
import SearchComponentExample from './use-cases/SearchComponentExample';
import StarRatingExample from './use-cases/StarRatingExample';
import Timer from './use-cases/Timer';
import TooltipExample from './use-cases/TooltipExample';
import WeatherForecastApp from './use-cases/WeatherForecastApp';

// Load the Mantine example on demand: its module imports Mantine's global
// stylesheet, which would otherwise restyle every other example.
const MantineThemeExample = lazy(() => import('./use-cases/MantineThemeExample'));

function App() {
  const exampleName = import.meta.env.VITE_NAME || 'BlogPostExample';
  // exampleName is Default to BlogPostExample if not set in environment variables
  // you can also hardcode it to any example you want to test, e.g., 'CssSpecificityExample'

  return (
    <>
      {/* Chapter 3 examples — Frontend system design */}
      {exampleName === 'StarRatingExample' && <StarRatingExample />}
      {exampleName === 'WeatherForecastApp' && <WeatherForecastApp />}

      {/* Chapter 4 examples — HTML, CSS, and the fundamentals */}
      {exampleName === 'BlogPostExample' && <BlogPostExample />}
      {exampleName === 'CssSpecificityExample' && <CssSpecificityExample />}
      {exampleName === 'DragAndDrop' && <DragAndDrop />}
      {exampleName === 'FormAdvanced' && <FormAdvanced />}
      {exampleName === 'FormSimple' && <FormSimple />}

      {/* Chapter 5 examples — JavaScript and TypeScript */}
      {exampleName === 'GenericConstraintsExample' && <GenericConstraintsExample />}
      {exampleName === 'GenericListExample' && <GenericListExample />}
      {exampleName === 'Timer' && <Timer />}

      {/* Chapter 6 examples — React core principles and patterns */}
      {exampleName === 'ContextApiExample' && <ContextApiExample />}
      {exampleName === 'DebounceExample' && <DebounceExample />}
      {exampleName === 'PropDrillingExample' && <PropDrillingExample />}
      {exampleName === 'RenderComponentExample' && <RenderComponentExample />}
      {exampleName === 'SearchComponentExample' && <SearchComponentExample />}
      {exampleName === 'TooltipExample' && <TooltipExample />}

      {/* Chapter 7 examples — React in production: ecosystem and toolchain */}
      {exampleName === 'BlogPostApp' && <BlogPostApp />}
      {exampleName === 'FaviconExample' && <FaviconExample />}
      {exampleName === 'MantineThemeExample' && (
        <Suspense fallback={null}>
          <MantineThemeExample />
        </Suspense>
      )}
      {exampleName === 'ModularRouteApp' && <ModularRouteApp />}
      {exampleName === 'NestedRoutesExample' && <NestedRoutesExample />}
      {exampleName === 'ProtectedRouteExample' && <ProtectedRouteExample />}
      {exampleName === 'ReactRouterExample' && <ReactRouterExample />}

      {/* Chapter 8 examples — Distributed systems fluency */}
      {exampleName === 'LRUDemo' && <LRUDemo />}
    </>
  );
}

export default App;
