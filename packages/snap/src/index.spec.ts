import { RPCHandlerFactory } from './handler/rpc-handler.factory';
import { onRpcRequest } from '.';

describe('onRpcRequest', () => {
  let origin: string;
  let request: any;
  beforeAll(() => {
    origin = 'http://localhost:3000';
    request = {
      method: 'myMethod',
      params: ['test'],
    };
  });

  it('should throw error if origin is not provided', () => {
    const t = () => {
      return onRpcRequest(request);
    };

    expect(t).toThrowError({
      name: 'Error',
      message: 'Origin parameter must be provided!',
    });
  });

  it('should call RPCHandlerFactory create method with correct parameter', () => {
    RPCHandlerFactory.create = jest
      .fn()
      .mockImplementationOnce((method: string) => {
        expect(method).toBe(request.method);

        return {
          handler: jest.fn().mockReturnValue('val'),
        };
      });

    onRpcRequest({ origin, request });
  });

  it('should call RPCHandlerFactory handler method with correct parameters', () => {
    RPCHandlerFactory.create = jest
      .fn()
      .mockImplementationOnce((method: string) => {
        expect(method).toBe(request.method);

        return {
          handler: jest
            .fn()
            .mockImplementationOnce((o: string, params: any) => {
              expect(o).toBe(origin);
              expect(params).toMatchObject(request.params);
            }),
        };
      });

    onRpcRequest({ origin, request });
  });

  it('should return RPCHandlerFactory handler data', () => {
    const mockedReturnedValue = 42;
    RPCHandlerFactory.create = jest
      .fn()
      .mockImplementationOnce((method: string) => {
        expect(method).toBe(request.method);

        return {
          handler: jest.fn().mockReturnValue(mockedReturnedValue),
        };
      });

    expect(onRpcRequest({ origin, request })).toBe(mockedReturnedValue);
  });
});
