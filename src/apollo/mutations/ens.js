import { setupENS } from '@ensdomains/ui'
import { isENSReadyReactive } from '../reactiveVars'
import { Contract, ethers } from 'ethers'
import { ETHRegistrarController as permanentRegistrarControllerContract } from '@ensdomains/ens-contracts'

let ens = {},
  registrar = {},
  ensRegistryAddress = undefined

export async function setup({
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  customProvider,
  ensAddress
}) {
  let option = {
    reloadOnAccountsChange: false,
    enforceReadOnly,
    enforceReload,
    customProvider,
    ensAddress
  }
  const {
    ens: ensInstance,
    registrar: registrarInstance,
    providerObject
  } = await setupENS(option)
  ens = ensInstance
  registrar = registrarInstance
  ensRegistryAddress = ensAddress
  isENSReadyReactive(true)
  return { ens, registrar, providerObject }
}

export function getRegistrar() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  registrar.permanentRegistrarController = new Contract(
    '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
    permanentRegistrarControllerContract,
    signer
  )
  return registrar
}

export function getEnsAddress() {
  return ensRegistryAddress
}

export default function getENS() {
  return ens
}
