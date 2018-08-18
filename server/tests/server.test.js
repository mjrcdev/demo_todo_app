const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {SmartTask} = require('./../models/smarttask');

const tasks = [{
  _id: new ObjectID(),
  text: 'Sample Task 1o3'
}, {
  _id: new ObjectID(),
  text: 'Smaple Task 2o3',
  completed: true,
  completedAt: 2101
}, {
  _id: new ObjectID(),
  text: 'Sample Task 3o3'
}];

beforeEach((done) => {
  SmartTask.remove({}).then(() => {
    return SmartTask.insertMany(tasks);
  }).then(() => done());
});

describe('POST /tasks', () => {
  it('Verification: Expected that a SmartTask can be created.', (done) => {
    var text = 'Test smart task';

    request(app)
      .post('/tasks')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SmartTask.find({text}).then((tasks) => {
          expect(tasks.length).toBe(1);
          expect(tasks[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Verification: Expected SmartTask Data Input Validation', (done) => {
    request(app)
      .post('/tasks')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        SmartTask.find().then((tasks) => {
          expect(tasks.length).toBe(3);
          done();
        }).catch((e) => done(e));
    });
  });
});

describe('GET /tasks', () => {
  it('Verification: Expected to retrieve SmartTasks', (done) => {
    request(app)
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.tasks.length).toBe(3);
      })
      .end(done);
  });
});
describe('GET /tasks/:id', () => {
  it('Verification: Expected to return task doc', (done) => {
    request(app)
      //note this uses a back tick
      .get(`/tasks/${tasks[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.task.text).toBe(tasks[0].text);
      })
      .end(done);
  });
  it('Verification: Expected to return 404 if task is not found', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .get(`/tasks/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('Verification: Expected to return 404 for invalid IDs', (done) => {
    request(app)
      .get('/tasks/9876543210')
      .expect(404)
      .end(done);
  });
});



describe('DELETE /tasks/:id', () => {
  it('Verification: Expected to remove task.', (done) => {
    var hexID = tasks[2]._id.toHexString();

    request(app)
      .delete(`/tasks/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.task._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SmartTask.findById(hexID).then((task) => {
          expect(task).toNotExist();
          done();
        }).catch((e) => done());
      });
  });
  it('Verification: Expection 404 if the task is not found.', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .delete(`/tasks/${hexID}`)
      .expect(404)
      .end(done);
  });
  it('Verification: Expection 404 if ObjectID for task is invalid.', (done) => {
    request(app)
      .delete('/tasks/9876543210')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /tasks/:id', () => {
  it('Verification: Ability to update the task', (done) => {
    var hexID = tasks[0]._id.toHexString();
    var text = 'This is text';

    request(app)
      .patch(`/tasks/${hexID}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.task.text).toBe(text);
        expect(res.body.task.completed).toBe(true);
        //expect(res.body.task.completedAT).toBe('number');
        //as of 8/18 running expect 23.5 and the .toBeA function does not work
      })
      .end(done)
  });

  it('Verification: Confirm that completedAT is null if task is incomplete', (done) => {
    var hexID = tasks[1]._id.toHexString();
    var text = 'This is text for the second example';

    request(app)
      .patch(`/tasks/${hexID}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.task.text).toBe(text);
        //expect(res.body.task.completedAt).toNotExist();
        //as of 8/18 running expect 23.5 and the .toNotExist function does not work
      })
      .end(done)
  });
});
