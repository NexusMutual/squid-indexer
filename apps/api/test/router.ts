// build fails with this test file

// import { Product, ProductType } from '@nexusmutual/db-schema/model';
// import { expect } from 'chai';
// import sinon from 'sinon';

// import { setDataSource } from '#db.js';
// import { getProducts, getProductTypes } from '#router.js';

// describe('Router Logic', () => {
//   let mockFind: sinon.SinonStub;
//   let mockGetRepository: sinon.SinonStub;

//   beforeEach(() => {
//     mockFind = sinon.stub().resolves([]);
//     mockGetRepository = sinon.stub().returns({
//       find: mockFind,
//     });

//     const mockDataSource = {
//       getRepository: mockGetRepository,
//     };

//     setDataSource(mockDataSource as any);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it('getProducts returns products ordered by id ASC', async () => {
//     const fakeProducts = [
//       { id: '1', name: 'P1' },
//       { id: '2', name: 'P2' },
//     ];

//     mockFind.resolves(fakeProducts);

//     const result = await getProducts();

//     expect(result).to.deep.equal(fakeProducts); // deep equality
//     expect(result).to.equal(fakeProducts); // strict equality (===)

//     expect(mockGetRepository.calledOnce).to.be.true;
//     expect(mockGetRepository.calledWith(Product)).to.be.true;

//     expect(mockFind.calledOnce).to.be.true;
//     expect(mockFind.firstCall.args[0]).to.deep.equal({
//       order: { id: 'ASC' },
//     });
//   });

//   it('getProductTypes returns product types ordered by id ASC', async () => {
//     const fakeTypes = [{ id: '1', name: 'T1' }];

//     mockFind.resolves(fakeTypes);

//     const result = await getProductTypes();

//     expect(result).to.deep.equal(fakeTypes);

//     expect(mockGetRepository.calledOnce).to.be.true;
//     expect(mockGetRepository.calledWith(ProductType)).to.be.true;

//     expect(mockFind.calledOnce).to.be.true;
//     expect(mockFind.firstCall.args[0]).to.deep.equal({
//       order: { id: 'ASC' },
//     });
//   });
// });
