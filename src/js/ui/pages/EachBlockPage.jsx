/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import kandybars from 'kandybars';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import commonUtil from '../../lib/common';
import PreviewCode from '../components/PreviewCode';

class EachBlockPage extends React.Component {
  constructor(props) {
    super(props);

    this.html = '{{#each items}}{{this}},{{/each}}';
    this.json = {
      items: [1, 2, 3, 4, 5],
    };

    this.state = {
      html: this.html,
      json: this.json,
    };

    this.handleCodeChanged = this.handleCodeChanged.bind(this);
    this.handleJsonChanged = this.handleJsonChanged.bind(this);
  }

  handleCodeChanged(code) {
    this.setState({ html: commonUtil.decodeHtmlEntities(code) });
  }

  handleJsonChanged(code) {
    this.setState({ json: JSON.parse(commonUtil.decodeHtmlEntities(code)) });
  }

  renderTemplate() {
    const { html, json } = this.state;
    let result = null;

    try {
      result = kandybars.renderHTML(html, json);
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  render() {
    return (
      <section>
        <h2><FormattedMessage
          id="each"
          defaultMessage="Each"
        />
        </h2>

        <div className="sandbox">
          <div className="row">
            <div className="col-md-4">
              <section>
                <h4><FormattedMessage
                  id="json"
                  defaultMessage="JSON"
                />
                </h4>
                <PreviewCode
                  content={JSON.stringify(this.json, null, 2)}
                  contentEditable
                  language="json"
                  onContentChanged={this.handleJsonChanged}
                />
              </section>
            </div>
            <div className="col-md-4">
              <section>
                <h4><FormattedMessage
                  id="html"
                  defaultMessage="HTML"
                />
                </h4>
                <PreviewCode
                  content={this.html}
                  contentEditable
                  language="handlebars"
                  onContentChanged={this.handleCodeChanged}
                />
              </section>
            </div>
            <div className="col-md-4">
              <section>
                <h4><FormattedMessage
                  id="result"
                  defaultMessage="Result"
                />
                </h4>
                <PreviewCode
                  content={this.renderTemplate()}
                  language="markup"
                />
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EachBlockPage;
