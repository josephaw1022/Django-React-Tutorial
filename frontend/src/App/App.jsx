import React, { Component } from "react";
 import Modal from "./components/Modal";
 import axios from "axios";

 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       viewCompleted: false,
       activeItem: {
         title: "",
         description: "",
         completed: false
       },
       todoList: [],
       modal:false 
     };
   }

   // Once the component is mounted and rendered then execute the refreshlist function 
   componentDidMount() {
     this.refreshList();
   }

   // Function to handle the fetching of the backend api to refresh the list 
   refreshList = () => {
     axios
       .get("https://django-react-tutorial.vercel.app/api/todos/")
       .then(res => this.setState({ todoList: res.data }))
       .catch(err => console.log(err));
   };

   // Function to handle the changing of the list that you want to view: complete or incomplete 
   displayCompleted = status => {
     if (status) {
       return this.setState({ viewCompleted: true });
     }
     return this.setState({ viewCompleted: false });
   };



   // Function that creates the complete and incomplete buttons 
   renderTabList = () => {
     return (
       <div className="my-5 tab-list">
         <span
           onClick={() => this.displayCompleted(true)}
           className={this.state.viewCompleted ? "active" : ""}
         >
           complete
         </span>
         <span
           onClick={() => this.displayCompleted(false)}
           className={this.state.viewCompleted ? "" : "active"}
         >
           Incomplete
         </span>
       </div>
     );
   };
   

   // Function to render the items in the list based on which button you press: complete or incomplete 
   renderItems = () => {
     // Fetches the local state of the viewCompleted object (what items you want to view: complete or incomplete)
     const { viewCompleted } = this.state;
     
     // Organizing the items in the list by whether or not they are completed or not based on which list you want to view 
     const newItems = this.state.todoList.filter(
       item => item.completed === viewCompleted
     );
    
     //maps the items in the newItems constant 
     return newItems.map(item => (
       <li
         key={item.id}
         className="list-group-item d-flex justify-content-between align-items-center"
       >
         <span
           className={`todo-title mr-2 ${
             this.state.viewCompleted ? "completed-todo" : ""
           }`}
           title={item.description}
         >
           {item.title}
         </span>
         <span>
           
           <button
             onClick={() => this.editItem(item)}
             className="btn btn-secondary mr-2"
           >
             {" "}
             Edit{" "}
           </button>
           <button
             onClick={() => this.handleDelete(item)}
             className="btn btn-danger"
           >
             Delete{" "}
           </button>
         </span>
       </li>
     ));
   };




   // Function to handle the toggling of the modal state 
   toggle = () => {
     // Toggles the modal state which either shows or doesn't show the modal 
     this.setState({ modal: !this.state.modal });
   };



   // Function to handle the submit process of clicking submit 
   handleSubmit = item => {

     // Toggle the modal state to off which stops showing the modal 
     this.toggle();
     // If already in the database and simply editing the item, then just put the item in 'item's id' location in the DB 
     if (item.id) {
       axios
         .put(`https://django-react-tutorial.vercel.app/api/todos/${item.id}/`, item)
         .then(res => this.refreshList());
       return;
     }
     // Api call to the backend to post a new object in the database 
     axios
       .post("https://django-react-tutorial.vercel.app/api/todos/", item)
       .then(res => this.refreshList());
   };



   // Function to handle the deleting of an item in the list 
   handleDelete = item => {
    //  Api call to the backend to delete an object from the list using axios 
     axios
       .delete(`https://django-react-tutorial.vercel.app/api/todos/${item.id}`)
       // Once deleted this will run the refreshList function which will fetch all the items from api 
       .then(res => this.refreshList());
   };



   // Function designed to add an item in the list 
   createItem = () => {

    //   Creates an item object with attributes that will be passed to the local state 
     const item = { title: "", description: "", completed: false };
     this.setState({ 
       // Brings the attributes of the const item to the local state object: activeItem  
       activeItem: item,
      // toggles the modal's state to be true 
      modal: !this.state.modal });
   };




  //  Function designed to edit the item in the list 
   editItem = item => {
     
    this.setState({ 
      // Stores the item's info into the local state which is passed into the modal component 
       activeItem: item,
       // Toggles the modal to show 
      modal: !this.state.modal 
    });

   };


  // This is where we render the component  
   render() {
     return (
       <main className="content">
         <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
         <div className="row ">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
               <div className="">
                 <button onClick={this.createItem} className="btn btn-primary">
                   Add task
                 </button>
               </div>
               {this.renderTabList()}
               <ul className="list-group list-group-flush">
                 {this.renderItems()}
               </ul>
             </div>
           </div>
         </div>
         {this.state.modal ? (
           <Modal
             activeItem={this.state.activeItem}
             toggle={this.toggle}
             onSave={this.handleSubmit}
           />
         ) : null}
       </main>
     );
   }
 }

 
 export default App;