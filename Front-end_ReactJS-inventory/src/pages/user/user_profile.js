import React from 'react';

function UpdateProfile() {
    return (
        <div className="modal fade" id="firefoxModal" tabindex="-1" role="dialog" aria-labelledby="firefoxModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title" id="firefoxModalLabel">Firefox Bug Test</h4>
                    </div>
                    <div className="modal-body">
                        <ol>
                            <li>Ensure you're using Firefox.</li>
                            <li>Open a new tab and then switch back to this tab.</li>
                            <li>Click into this input: <input type="text" id="ff-bug-input" /></li>
                            <li>Switch to the other tab and then back to this tab.</li>
                        </ol>
                        <p>Test result: <b id="ff-bug-test-result"></b></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;