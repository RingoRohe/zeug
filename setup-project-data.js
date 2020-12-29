const sdk = require('node-appwrite');
const fs = require('fs');

const HOST = 'http://localhost:1234/v1';
const PROJECT = '5fe8ea702d4a3';
const API_KEY = 'ea699e4b4ad739db5d2d8c2838100063bab11cfb116911806adc3ee325d17b1de162e6e9211f66d712a7607a14c339a8306e2efea808771cb984a0eea491d5e144a6efb25f8dd0144888515d9b2f37390c95b3ef45445b770e4b00359f644b7db5a2804730cec645c13282c4418ac2248f45573afe56c720404cbb5ac3e9a4b8';

let client = new sdk.Client();

client
  .setEndpoint(HOST) // Your API Endpoint
  .setProject(PROJECT) // Your project ID
  .setKey(API_KEY) // Your secret API key
  ;

let users = new sdk.Users(client);
let database = new sdk.Database(client);
let allCollections = [];

// create some users
let createUsers = () => {
  let userCreatePromise1 = users.create('hallo@ringorohe.de', 'Rr17Zg83', 'Ringo');
  userCreatePromise1.then(function (response) {
    console.info('User Ringo created');
    const userId = response.$id;

    // activate User
    let userPromise = users.updateStatus(userId, 1);
    userPromise.then(userResponse => {
      console.info('Ringo activated');
    }, error => {
      console.error('Ringo not activated');
    });

  }, function (error) {
    console.error('User Ringo not created', error.error);
  });

  let userCreatePromise2 = users.create('peter@ringorohe.de', 'Rr17Zg83', 'Peter');
  userCreatePromise2.then(function (response) {
    console.info('User Peter created');
    const userId = response.$id;

    // activate User
    let userPromise = users.updateStatus(userId, 2);
    userPromise.then(userResponse => {
      console.info('Peter blocked');
    }, error => {
      console.error('Peter not blocked');
    });

  }, function (error) {
    console.log('Peter not created', error.error);
  });
}

// add collections
let createTypesCollection = () => {
  let typesCollection = allCollections.find(item => item.name === 'types');
  if (typesCollection) {
    console.info('Collection "types" already exists');
    let promise = new Promise((resolve, reject) => {
      resolve(typesCollection);
    })
    return promise;
  } else {
    let promise = database.createCollection(
      'types',
      ['*'],
      ['*'],
      [
        {
          "label": "Title",
          "key": "title",
          "type": "text",
          "required": false,
          "array": false,
          "default": ""
        },
        {
          "label": "Icon",
          "key": "icon",
          "type": "text",
          "required": false,
          "array": false,
          "default": ""
        }
      ]
    );

    promise.then(
      response => {
        console.info('Collection "types" created');
      }, error => {
        console.error('collection "types" not created', error.error);
      }
    );

    return promise;
  }
}

let createStoragesCollection = () => {
  let storagesCollection = allCollections.find(item => item.name === 'storages');
  if (storagesCollection) {
    console.info('Collection "storages" already exists');
    let promise = new Promise((resolve, reject) => {
      resolve(storagesCollection);
    })
    return promise;
  } else {
    let promise = database.createCollection(
      'storages',
      ['*'],
      ['*'],
      [
        {
          "label": "Title",
          "key": "title",
          "type": "text",
          "required": false,
          "array": false,
          "default": ""
        },
        {
          "label": "Description",
          "key": "description",
          "type": "text",
          "required": false,
          "array": false,
          "default": ""
        }
      ]
    );

    promise.then(
      response => {
        console.info('Collection "storages" created');
      }, error => {
        console.error('collection "storages" not created', error.error);
      }
    );

    return promise;
  }
}

let createItemsCollection = () => {
  let itemsCollection = allCollections.find(item => item.name === 'items');
  if (itemsCollection) {
    console.info('Collection "items" already exists');
    let promise = new Promise((resolve, reject) => {
      resolve(itemsCollection);
    })
    return promise;
  } else {
    let promise = database.createCollection(
      'items',
      ['*'],
      ['*'],
      []
    );

    promise.then(
      response => {
        console.info('Collection "items" created');
      }, error => {
        console.error('collection "items" not created', error.error);
      }
    );

    return promise;
  }
}

let updateItemsCollection = (typesCollection, storagesCollection, itemsCollection) => {
  let promise = database.updateCollection(
    itemsCollection.$id,
    'items',
    ['*'],
    ['*'],
    [
      {
        "label": "Title",
        "key": "title",
        "type": "text",
        "required": false,
        "array": false,
        "default": ""
      },
      {
        "label": "Type",
        "key": "type",
        "type": "document",
        "required": false,
        "array": false,
        "list": [
          typesCollection.$id
        ]
      },
      {
        "label": "Is primary",
        "key": "isPrimary",
        "type": "boolean",
        "required": false,
        "array": false,
        "default": false
      },
      {
        "label": "Description",
        "key": "description",
        "type": "text",
        "required": false,
        "array": false,
        "default": ""
      },
      {
        "label": "First Day of Use",
        "key": "firstDayOfUse",
        "type": "numeric",
        "required": false,
        "array": false
      },
      {
        "label": "Manufacturer",
        "key": "manufacturer",
        "type": "text",
        "required": false,
        "array": false,
        "default": ""
      },
      {
        "label": "Model",
        "key": "model",
        "type": "text",
        "required": false,
        "array": false,
        "default": ""
      },
      {
        "label": "Storage",
        "key": "storage",
        "type": "document",
        "required": false,
        "array": false,
        "list": [
          storagesCollection.$id
        ]
      },
      {
        "label": "is attached to",
        "key": "isAttachedTo",
        "type": "document",
        "required": false,
        "array": false,
        "list": [
          itemsCollection.$id
        ]
      }
    ]
  );

  promise.then(
    response => {
      console.info('Collection "items" updated');
    }, error => {
      console.error('collection "items" not updated', error.error);
    }
  );

  return promise;
}

let getCurrentCollections = () => {
  let collectiosPromise = database.listCollections();

  collectiosPromise.then(
    response => {
      allCollections = response.collections;
    }, error => {
      console.error(error);
  });

  return collectiosPromise;
}


let p = getCurrentCollections();

p.finally(() => {
  createUsers();

  let typesPromise = createTypesCollection();
  let storagesPromise = createStoragesCollection();
  let itemsPromise = createItemsCollection();
  Promise.all([typesPromise, storagesPromise, itemsPromise]).then(data => {
    updateItemsCollection(data[0], data[1], data[2]);
  }, error => {
    console.error('Error while creating Collections', error.error)
  }).finally(() => {
    let collectionsPromise = getCurrentCollections();
    let output = [];

    collectionsPromise.then(
      response => {
        response.collections.forEach(item => {
          output.push({
            id: item.$id,
            name: item.name
          })
        });
        fs.writeFileSync('./src/assets/collections.json', JSON.stringify(output));
      },
      error => {
        console.error(error);
      }
    );
  });
});
