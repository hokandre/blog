<template>
    <div class="modal" id="modalRegister">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white ">
                        <h3 class="mx-auto">Register </h3>
                </div>
                <div class="modal-body">
                    <p class="alert alert-success">
                        <strong> Succes regitered! </strong>
                        <button class="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </p>
                        <p class="alert alert-danger">Error regitered!
                        <button class="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                        </p>
                    <div class="form-group">
                        <label for="name"> Name : </label>
                        <input type="text" class="form-control" id="name" placeholder="enter your name ....">
                        <small id="name_muted" class="form-text text-muted"> field name must be filled</small>
                    </div>
                    <div class="form-group">
                        <label for="email"> Email : </label>
                        <input type="email" class="form-control" id="email" placeholder="enter your email ....">
                        <small id="email_muted" class="form-text text-muted"> field email must be filled</small>
                    </div>
                        <div class="form-group">
                        <label for="email"> Password : </label>
                        <input type="password" class="form-control" id="password" placeholder="enter your password ....">
                        <small id="password_muted" class="form-text text-muted"> field password must be filled</small>
                    </div>

                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" type="button">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
