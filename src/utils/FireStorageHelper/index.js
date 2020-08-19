import { fileMD5Hash, getExtension } from "../file";
import { run } from "../object";

export default class FireStorageHelper {
  constructor(fireStorage, storageRef) {
    this.fireStorage = fireStorage;
    this.storageRef = storageRef;
  }

  async uploadFile(path, file, options) {
    const fileHash = await fileMD5Hash(file);

    path = `${path}/${fileHash}.${getExtension(file.name)}`;

    const uploadTask = this.storageRef.child(path).put(file, {
      contentType: file.type,
      md5Hash: fileHash,
      customMetadata: {},
    });

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        run(options, "onProgress", progress);

        switch (snapshot.state) {
          case this.fireStorage.TaskState.PAUSED:
            run(options, "onPause");
            break;
          case this.fireStorage.TaskState.RUNNING:
            run(options, "onRunning");
            break;
        }
      },
      function (error) {
        run(options, "onFailed", error);
      },
      function () {
        run(options, "onComplete", path);
      }
    );

    return uploadTask;
  }

  async uploadString(path, file, options) {
    path = `${path}/${Date.now()}.${getExtension(file.name)}`;

    const uploadTask = this.storageRef.child(path).put(file, {
      contentType: file.type,
      md5Hash: fileHash,
      customMetadata: {},
    });

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        run(options, "onProgress", progress);

        switch (snapshot.state) {
          case this.fireStorage.TaskState.PAUSED:
            run(options, "onPause");
            break;
          case this.fireStorage.TaskState.RUNNING:
            run(options, "onRunning");
            break;
        }
      },
      function (error) {
        run(options, "onFailed", error);
      },
      function () {
        run(options, "onComplete", path);
      }
    );

    return uploadTask;
  }

  getDownloadPath(path) {
    return this.storageRef.ref(path).getDownloadURL();
  }

  deleteFile(...files) {
    const self = this;

    return Promise.all(
      files.map(function (path) {
        if (!path) return;

        const fileRef = self.storageRef.child(path);

        // Delete the file
        return fileRef.delete();
      })
    );
  }
}
