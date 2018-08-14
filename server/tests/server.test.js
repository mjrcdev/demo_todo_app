const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {SmartTask} = require('./../models/smarttask');

const tasks = [{
  text: 'Smart Task One (1)'
}, {
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
  it('Verification: Retrieve SmartTasks Database', (done) => {
    request(app)
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.tasks.length).toBe(2);
      })
      .end(done);
  });
});
