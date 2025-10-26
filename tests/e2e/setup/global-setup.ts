// tests/e2e/setup/global-setup.ts
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from "node:stream/web";
import { TextDecoder, TextEncoder } from "node:util";

interface GlobalPolyfills {
  TransformStream?: typeof TransformStream;
  ReadableStream?: typeof ReadableStream;
  WritableStream?: typeof WritableStream;
  TextEncoder?: typeof TextEncoder;
  TextDecoder?: typeof TextDecoder;
}

export default async function globalSetup() {
  const globals = globalThis as typeof globalThis & GlobalPolyfills;

  // Polyfills idempotentes
  Object.assign(globals, {
    TransformStream: globals.TransformStream ?? TransformStream,
    ReadableStream: globals.ReadableStream ?? ReadableStream,
    WritableStream: globals.WritableStream ?? WritableStream,
    TextEncoder: globals.TextEncoder ?? TextEncoder,
    TextDecoder: globals.TextDecoder ?? TextDecoder,
  } as GlobalPolyfills & typeof globalThis);
}
