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

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainSidebar from '../components/MainSidebar';
import EachBlockPage from '../pages/EachBlockPage';
import EvalPage from '../pages/EvalPage';
import HelperPage from '../pages/HelperPage';
import HomePage from '../pages/HomePage';
import IfBlockPage from '../pages/IfBlockPage';
import PartialPage from '../pages/PartialPage';
import VariablePage from '../pages/VariablePage';

function SidebarLayout() {
  return (
    <div
      id="layout"
      className="layout layout-sidebar"
    >
      <div id="body">
        <MainSidebar />
        <div id="content">
          <Switch>
            <Route
              exact
              path="/"
              component={HomePage}
            />
            <Route
              exact
              path="/syntax/each"
              component={EachBlockPage}
            />
            <Route
              exact
              path="/syntax/eval"
              component={EvalPage}
            />
            <Route
              exact
              path="/syntax/helper"
              component={HelperPage}
            />
            <Route
              exact
              path="/syntax/if"
              component={IfBlockPage}
            />
            <Route
              exact
              path="/syntax/partial"
              component={PartialPage}
            />
            <Route
              exact
              path="/syntax/variable"
              component={VariablePage}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
