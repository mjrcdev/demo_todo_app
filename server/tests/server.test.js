const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {SmartTask} = require('./../models/smarttask');

const tasks = [{
  _id: new ObjectID(),
  text: 'Smart Task One (1)'
}, {
  _id: new ObjectID(),
  text: 'Smart Task Two (2)'
}];

beforeEach((done) => {
  SmartTask.remove({}).then(() => {
    return SmartTask.insertMany(tasks);
  }).then(() => done());
});

describe('POST /tasks', () => {
  it('Verification: SmartTask created.', (done) => {
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

  it('Verification: SmartTask Data Input Validation', (done) => {
    request(app)
      .post('/tasks')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        SmartTask.find().then((tasks) => {
          expect(tasks.length).toBe(2);
          done();
        }).catch((e) => done(e));
    });
  });
});

describe('GET /tasks', () => {
  it('Verification: Retrieve SmartTasks', (done) => {
    request(app)
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.tasks.length).toBe(2);
      })
      .end(done);
  });
});
describe('GET /tasks/:id', () => {
  it('Verification: Return task doc', (done) => {
    request(app)
      //note this uses a back tick
      .get(`/tasks/${tasks[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.task.text).toBe(tasks[0].text);
      })
      .end(done);
  });
  it('Verification: Return 404 if task is not found', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .get(`/tasks/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('Verification: Return 404 for invalid IDs', (done) => {
    request(app)
      .get('/tasks/9876543210')
      .expect(404)
      .end(done);
  });
});
