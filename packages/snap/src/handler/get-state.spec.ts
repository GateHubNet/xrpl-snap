import { StateHelper } from '../helpers/state';
import { GetState } from './get-state';

describe('GetState', () => {
  it('should return correct RPC Method name', () => {
    expect(GetState.RPCMethod()).toBe('xrpl_getState');
  });

  it('should return value from StateHelper', async () => {
    const mockedResolvedValue = { value: 'resolvedValueTest' };
    StateHelper.get = jest.fn().mockResolvedValue(mockedResolvedValue);

    const getStateInstance = new GetState();
    const response = await getStateInstance.handler('', {});
    expect(response).toBe(mockedResolvedValue);
  });
});
