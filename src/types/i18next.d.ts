
import 'react-i18next';
// Use type instead of interface for more flexibility with React typing
declare module 'react-i18next' {
  // Make TFuncReturn compatible with ReactNode
  type TFuncReturn = ReactNode;
  
  // Remove the explicit extends ReactNode since that's causing the problem
  interface ReactI18NextChildren {
    [key: string]: unknown;
    toString(): string;
  }
}

// Modify React's namespace to treat ReactI18NextChildren as ReactNode
declare global {
  namespace React {
    // Augment ReactNode to include ReactI18NextChildren
    type ReactNode = ReactNode | import('react-i18next').ReactI18NextChildren;
  }
}
