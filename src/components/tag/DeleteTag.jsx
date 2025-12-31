export const handleDelete = (id) => {
   const token = localStorage.getItem("jwtToken");

  fetch(`${import.meta.env.VITE_API_BASE_URL}/Tag/delete-tag?tag_id=${id}`, {
    method: "DELETE",
    mode: "cors",
    headers:{
        "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.ok) {
        setTags(prev => prev.filter(tag => tag.id !== id));
      } else {
        console.error("Error al eliminar el tag");
      }
    })
    .catch(err => console.error(err));
};

return <ManageTagsScreen onDelete={handleDelete} />;
