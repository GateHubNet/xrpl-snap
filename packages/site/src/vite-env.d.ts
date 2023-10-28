/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable spaced-comment */

import { MetaMaskInpageProvider } from '@metamask/providers';

/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
