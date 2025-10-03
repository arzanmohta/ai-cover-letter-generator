declare module "formidable" {
  import { IncomingMessage } from "http";

  interface File {
    filepath: string;
    originalFilename?: string | null;
    mimetype?: string | null;
    size: number;
  }

  interface Files {
    [key: string]: File | File[];
  }

  interface Fields {
    [key: string]: any;
  }

  interface Options {
    multiples?: boolean;
    uploadDir?: string;
    keepExtensions?: boolean;
  }

  type Callback = (err: any, fields: Fields, files: Files) => void;

  class IncomingForm {
    constructor(options?: Options);
    parse(req: IncomingMessage, callback: Callback): void;
  }

  export { File, Files, Fields, Options, Callback, IncomingForm };
}
