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
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import commonUtil from "../../lib/common";
import kandybars from "kandybars";
import React from "react";
import {FormattedMessage} from "react-intl";
import {PreviewCode} from "../components/PreviewCode";

export class HelperPage extends React.Component {

    constructor(props) {
        super(props);

        this.html = "{{toUpper text}}";
        this.json = {
            text: "Hello World"
        };

        this.state = {
            html: this.html,
            json: this.json
        };

        this.handleCodeChanged = this.handleCodeChanged.bind(this);
        this.handleJsonChanged = this.handleJsonChanged.bind(this);
    }

    handleCodeChanged(code) {
        this.setState({html: commonUtil.decodeHtmlEntities(code)});
    }

    handleJsonChanged(code) {
        this.setState({json: JSON.parse(commonUtil.decodeHtmlEntities(code))});
    }

    render() {

        if (!kandybars.isHelper("toUpper")) {
            kandybars.registerHelper("toUpper", (value) => {
                return typeof value === "string" ? value.toUpperCase() : value;
            });
        }

        return (
            <section>
                <h2><FormattedMessage id="helper" defaultMessage="Helper"/></h2>

                <div className="sandbox">
                    <div className="row">
                        <div className="col-md-4">
                            <h4><FormattedMessage id="json" defaultMessage="JSON"/></h4>
                            <PreviewCode content={JSON.stringify(this.json, null, 2)}
                                         contentEditable={true}
                                         language={"json"}
                                         onContentChanged={this.handleJsonChanged}/>
                        </div>
                        <div className="col-md-4">
                            <h4><FormattedMessage id="html" defaultMessage="HTML"/></h4>
                            <PreviewCode content={this.html}
                                         contentEditable={true}
                                         language={"handlebars"}
                                         onContentChanged={this.handleCodeChanged}/>
                        </div>
                        <div className="col-md-4">
                            <h4><FormattedMessage id="result" defaultMessage="Result"/></h4>
                            <PreviewCode content={this.renderTemplate()}
                                         language={"markup"}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    renderTemplate() {
        const html = this.state.html;
        const data = this.state.json;
        let result = null;

        try {
            result = kandybars.renderHTML(html, data);
        }
        catch (error) {
            console.error(error);
            result = error;
        }
        return result;
    }
}
