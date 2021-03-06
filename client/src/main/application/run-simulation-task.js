(function() {
	"use strict";
	
	var SimulationModel = require('./simulation-model');
	var EditSimulationParamsTask = require('./edit-simulation-params-task');
	
	var precondition = require('./contract').precondition;

	exports.start = function (params, size) {
		precondition(params, 'RunSimulationTask requires the parameters of the simulation');
		precondition(size, 'RunSimulationTask requires the size of the simulation');
		
		return new RunSimulationTask(params, size);
	};

	function RunSimulationTask(params, size) {
		this._stopped = new Rx.AsyncSubject();
		this._editSimulationParamsTask = EditSimulationParamsTask.start(params);
		this._model = SimulationModel.newModel(params, size);
		
		var self = this;
		this._editSimulationParamsTask.simulationActive()
			.filter(function (active) { return active; })
			.subscribe(function() {
				var stopped = self._stopped.merge(
					self._editSimulationParamsTask.simulationActive()
						.filter(function (active) {
							return !active;
						}));
				
				Rx.Observable.timer(0, 20)
					.takeUntil(stopped)
					.withLatestFrom(self._editSimulationParamsTask.params(), paramsOnly)
					.subscribe(update(self._model));
			});
	}
	
	function paramsOnly(time, params) {
		return params;
	}
	
	function update(model) {
		return function (params) {
			model.update(params);
		};
	}

	RunSimulationTask.prototype.stop = function () {
		this._stopped.onNext();
		this._stopped.onCompleted();
	};
	
	RunSimulationTask.prototype.editSimulationParamsTask  = function () {
		return this._editSimulationParamsTask;
	};
	
	RunSimulationTask.prototype.model = function () {
		return this._model;
	};
}());