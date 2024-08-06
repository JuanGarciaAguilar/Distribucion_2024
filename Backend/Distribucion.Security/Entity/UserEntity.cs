namespace Distribucion.Security.Entity
{
    public class UserEntity
    {
        public string UserID { get; set; }
        public string UserPassword { get; set; }
        public string UserFirsttName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }   
        public byte UserState { get; set; }
        public string CreationDate { get; set; }
        public string CreationUser { get; set; }
        public string UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    }
}
