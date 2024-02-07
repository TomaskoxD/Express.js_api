const request = require('supertest');
const app = require('../../server');


describe('Person API', () => {
    
    it('should create a new student', async () => {
        const res = await request(app)
            .post('/api/students')
            .send({
                name: 'student',
                email: 'student@mail.com',
                grade: 10,
                locker: 101
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    }
    );

    it('should find student by email', async () => {
        const res = await request(app)
            .get('/api/students/email')
            .send({
                email: 'student@mail.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    }
    );
}
);
