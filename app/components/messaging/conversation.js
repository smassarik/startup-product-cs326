import React from 'react';

import Message from './message';

export default class Conversation extends React.Component {
  render() {
    return (
      <div>
        <div className="row messaging-text-entry">
          <div className="col-md-12">
            <form>
              <fieldset className="form-group">
                <textarea className="form-control text-entry-title" defaultValue="Re: The Projectionist" rows="1" />
                <textarea className="form-control text-entry-message" placeholder="Write a message..." rows="3"></textarea>
              </fieldset>
              <button type="submit" className="btn btn-primary pull-right">Submit</button>
            </form>
          </div>
        </div>

      </div>
    )
  }
}
