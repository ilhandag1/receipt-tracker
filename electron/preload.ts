import { contextBridge } from 'electron'

// İleride native özellikler eklemek istersen buraya ekleyebilirsin
// Şimdilik boş bırakıyoruz, contextBridge güvenlik için gerekli
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
})