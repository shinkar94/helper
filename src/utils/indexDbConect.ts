const openRequest = indexedDB.open('Chat', 1);

// openRequest.onupgradeneeded = function(event) {
//     const db = event.target.result;
//
//     // Создание объектного хранилища для файлов
//     if (!db.objectStoreNames.contains('files')) {
//         db.createObjectStore('files', { autoIncrement: true });
//     }
// };
//
// openRequest.onsuccess = function(event) {
//     const db = event.target.result;
//
//     // Добавление файла в объектное хранилище
//     const transaction = db.transaction('files', 'readwrite');
//     const store = transaction.objectStore('files');
//
//     if (variant === "video") {
//         const videoBlob = new Blob([event.data], { type: 'video/mp4' });
//
//         const request = store.add(videoBlob, 'video.mp4');
//         request.onsuccess = function() {
//             console.log('Видео успешно добавлено в IndexedDB');
//         };
//     } else {
//         const audioBlob = new Blob([event.data], { type: 'audio/mpeg' });
//
//         const request = store.add(audioBlob, 'audio.mp3');
//         request.onsuccess = function() {
//             console.log('Аудио успешно добавлено в IndexedDB');
//         };
//     }
//
//     transaction.oncomplete = function() {
//         console.log('Транзакция завершена');
//     };
//
//     transaction.onerror = function(event) {
//         console.error('Ошибка транзакции:', event.target.error);
//     };
// };