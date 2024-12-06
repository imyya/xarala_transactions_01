import React, { useEffect, useState } from 'react'
import { deleteTransaction, getTransactions, updateTransaction, createTransaction } from '../api'
import Modal from 'react-modal';
Modal.setAppElement('#root');
const TransactionList = () => {

  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    date: '',
    type: 'REVENU',
  });
 const [total, setTotal]= useState(0);


  const fetchTransactions = async () => {
    try {

      const response = await getTransactions();
      console.log('here they are', response);
      setTransactions(response);
      getTotal(response);

    } catch (error) {
      console.error('error fetching', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const resp = await deleteTransaction(id);
      fetchTransactions();
    }
    catch (error) {
      console.error('error deleting', error);
    }
  }

  const getTotal= (transacs)=>{
    const revenus = transacs.filter((transac)=> transac.type === 'REVENU')
    .reduce((acc, curr)=> acc + curr.amount,0)
    const depenses = transacs.filter((transac)=> transac.type === 'DEPENSE')
    .reduce((acc, curr)=> acc + curr.amount,0)

    setTotal(revenus - depenses);

    ;

  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
  }


  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };


  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTransaction(null);
    setIsEditModalOpen(false);
  };

  const handleCreate = async (e) =>{
    e.preventDefault();
    try {
      await createTransaction(newTransaction);
      fetchTransactions();
      closeCreateModal();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  }

  const handleNewTransactionChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  }

    const openCreateModal = () => {
      setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
      setNewTransaction({
        description: '',
        amount: '',
        date: '',
        type: 'REVENU',
      });
      setIsCreateModalOpen(false);
    };




  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateTransaction(selectedTransaction.id, selectedTransaction);
      fetchTransactions(); 
      closeEditModal();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  return (
    <div className='itim-regular text-lg  mx-auto w-[65vw] h-[50vh] flex flex-col  items-center justify-center gap-7 '>
      <h1 className='text-4xl mb-10 mt-5'>Transactions</h1>


      <table className='shadow-md 
 bg-stone-200 border-spacing-4  border-collapse w-full table-fixed text-center text-stone-700'>
        <thead className='bg-stone-400'>
          <tr className='' >
            <th className=''>
              Description
            </th>
            <th className=''>
              Montant
            </th>
            <th className=''>
              Date
            </th>
            <th className=''>
              Type
            </th>
            <th>

            </th>

          </tr>
        </thead>
        <tbody className=''>
          {transactions.map((transac, index) => (
            <tr key={transac.id} onClick={() => openModal(transac)} className={`hover:bg-slate-300 hover:cursor-pointer ${index % 2 === 0 ? '' : 'bg-stone-300'}`}>
              <td>
                {transac.description}
              </td>
              <td>
                {transac.amount}
              </td>
              <td>
                {formatDate(transac.date)}
              </td>
              <td>
                {transac.type}
              </td>
              <td className='flex gap-2 '>
                <button onClick={() => openEditModal(transac)} className='bg-stone-600 w-20 h-9 mb-3 mt-2 font-bold shadow-md rounded-md text-stone-50'>Edit</button>
                <button onClick={() => handleDelete(transac.id)} className='bg-red-700 w-20 mb-3 mt-2 font-bold rounded-md shadow-md text-stone-50'>Delete</button>
                <button onClick={() => openModal(transac)} className='bg-green-700 w-20 mb-3 mt-2 font-bold rounded-md shadow-md text-stone-50'>Details</button>


              </td>

            </tr>

          ))}
        </tbody>
      </table>

      <div className='bg-red300 w-[50%] flex justify-center'>
        <button onClick={openCreateModal} className=' w-32 text-white  bg-blue-400 h-12 text-xl rounded-md' >Ajouter</button>
        <div className=' w-[30%] flex gap-3 flex-row justify-center items-center' >
          <p>Total:</p>
          <input readOnly className='w-20 border-2  text-center h-7' type="text"  value = {total.toFixed(2)}/>
        </div>
      </div>


      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Details"
        className="bg-white p-10 rounded shadow-lg mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      >
        {selectedTransaction && (
          <div className='w-[400px] flex flex-col justify-center items-center'>
            <h2 className='text-xl font-bold mb-4'>Transaction Details</h2>
            <p><strong>Description: &nbsp;</strong> {selectedTransaction.description}</p>
            <p><strong>Montant: &nbsp;</strong> {selectedTransaction.amount}</p>
            <p><strong>Date: &nbsp;</strong> {formatDate(selectedTransaction.date)}</p>
            <p><strong>Type: &nbsp;</strong> {selectedTransaction.type}</p>
            <button onClick={closeModal} className='mt-4 bg-red-500 text-white px-4 py-2 rounded w-20'>Fermer</button>
          </div>
        )}
      </Modal>


      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Transaction"
        className="bg-white p-10 rounded shadow-lg mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      >
        {selectedTransaction && (
          <form onSubmit={handleEdit} className='w-[400px] flex flex-col justify-center items-center'>
            <h2 className='text-xl font-bold mb-4'>Edit Transaction</h2>
            <label className='mb-2'>
              Description:
              <input
                type="text"
                name="description"
                value={selectedTransaction.description}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </label>
            <label className='mb-2'>
              Montant:
              <input
                type="number"
                name="amount"
                value={selectedTransaction.amount}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </label>
            <div className='flex w-full gap-4 justify-center items-center'>

            <label className='mb-2'>
              Date:
              <input
                type="date"
                name="date"
                value={formatDate(selectedTransaction.date)}
                onChange={handleChange}
                className='border p-2 rounded w-full' />
            </label>
            <label className='mb-2'>
              Type:
              <select
                name="type"
                value={selectedTransaction.type}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              >
                <option value="REVENU">Revenu</option>
                <option value="DEPENSE">Depense</option>
              </select>
            </label>
            </div>

            <div className="flex justify-around w-[60%]">

            <button type="submit" className='mt-4 bg-slate-500 text-white px-4 py-2 rounded w-20'>Save</button>
            <button onClick={closeEditModal} className='mt-4 bg-red-500 text-white px-4 py-2 rounded w-20'>Cancel</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateModal}
        contentLabel="Create Transaction"
        className="bg-white p-10 rounded shadow-lg mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      >
        <form onSubmit={handleCreate} className='w-[400px] flex flex-col justify-center items-center'>
          <h2 className='text-xl font-bold mb-4'>Create Transaction</h2>
          <label className='mb-2'>
            Description:
            <input
              type="text"
              name="description"
              value={newTransaction.description}
              onChange={handleNewTransactionChange}
              className='border p-2 rounded w-full'
            />
          </label>
          <label className='mb-2'>
            Montant:
            <input
              type="number"
              name="amount"
              value={newTransaction.amount}
              onChange={handleNewTransactionChange}
              className='border p-2 rounded w-full'
            />
          </label>
          <label className='mb-2'>
            Date:
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleNewTransactionChange}
              className='border p-2 rounded w-full' />
          </label>
          <label className='mb-2'>
            Type:
            <select
              name="type"
              value={newTransaction.type}
              onChange={handleNewTransactionChange}
              className='border p-2 rounded w-full'
            >
              <option value="REVENU">Revenu</option>
              <option value="DEPENSE">Depense</option>
            </select>
          </label>
          <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded w-20'>Save</button>
          <button onClick={closeCreateModal} className='mt-4 bg-red-500 text-white px-4 py-2 rounded w-20'>Cancel</button>
        </form>
      </Modal>

    </div>
  )


}
export { TransactionList }  