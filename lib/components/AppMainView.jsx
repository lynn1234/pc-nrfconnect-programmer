/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MemoryLayout from '../components/MemoryLayout';

const AppMainView = (
    props => {
        const { file, target, refreshTargetContents } = props;

        let targetMap;
        if (!target.serialNumber) {
            targetMap = (
                <div className="target-map-disconnected">
                    Connect to a DevKit to see the contents of its non-volatile memory here.
                </div>
            );
        } else if (target.serialNumber && target.isReady) {
            const targetDevice = {
                filename: 'targetDevice',
                fileError: file.fileError,
                colour: '#C0C0C0',
                writtenAddress: 0,
                labels: target.labels,
                regions: target.regions,
            };
            targetMap = (
                <MemoryLayout
                    loaded={{ targetDevice }}
                    memMaps={[['targetDevice', target.memMap]]}
                    targetSize={target.romSize}
                    title="nRF 5x"
                    refresh={refreshTargetContents}
                />
            );
        } else {
            targetMap = <div className="memlayout-spinner" />;
        }


        return (
            <div className="app-main-view">
                <div className="column">
                    { targetMap }
                </div>
                <div className="column">
                    <MemoryLayout
                        loaded={file.loaded}
                        memMaps={file.memMaps}
                        targetSize={target.romSize}
                        title="Files"
                    />
                </div>
            </div>
        );
    }
);

AppMainView.propTypes = {
    file: PropTypes.shape({}).isRequired,
    target: PropTypes.shape({}).isRequired,
    refreshTargetContents: PropTypes.func.isRequired,
};

export default AppMainView;
