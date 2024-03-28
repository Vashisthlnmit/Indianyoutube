class ApiResponse{
    constructor(success,statuscode,message,data){
        this.success=success,
        this.statuscode=statuscode,
        this.message=message
        this.data=data
    }
}
export {ApiResponse}