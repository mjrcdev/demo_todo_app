const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {SmartTask} = require('./../models/smarttask');

beforeEach((done) => {
  SmartTask.remove({}).then(() => done());
});

describe('POST /tasks', () => {
  it('should create a new smart task', (done) => {
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

        SmartTask.find().then((tasks) => {
          expect(tasks.length).toBe(1);
          expect(tasks[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a smart task with invalid data', (done) => {
    request(app)
      .post('/tasks')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        SmartTask.find().then((tasks) => {
          expect(tasks.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
